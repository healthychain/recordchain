package eu.mhutti1.healthchain.server.create;

import com.sun.net.httpserver.HttpExchange;
import eu.mhutti1.healthchain.roles.Role;
import eu.mhutti1.healthchain.server.RequestUtils;
import eu.mhutti1.healthchain.server.events.EventConsumer;
import eu.mhutti1.healthchain.server.session.SessionInvalidException;
import eu.mhutti1.healthchain.server.session.SessionManager;
import eu.mhutti1.healthchain.storage.EventNode;
import eu.mhutti1.healthchain.storage.EventStorage;
import eu.mhutti1.healthchain.utils.Crypto;
import org.hyperledger.indy.sdk.IndyException;
import org.hyperledger.indy.sdk.wallet.Wallet;
import org.json.JSONObject;

import java.io.IOException;
import java.io.OutputStream;
import java.util.Map;
import java.util.concurrent.ExecutionException;

/**
 * Created by jedraz on 31/10/2018.
 */
public abstract class CreateApproveHandler extends EventConsumer {

  public abstract Role createVerifier(Wallet wallet, String did, String verKey);

  public abstract Role createAccountHolder(Role role, String did, String walletId, String walletKey) throws InterruptedException, ExecutionException, IndyException;

  @Override
  public boolean handleEventAction(HttpExchange httpExchange) throws IOException {
    httpExchange.getResponseHeaders().add("Access-Control-Allow-Origin", "*");

    String query = httpExchange.getRequestURI().getQuery();
    Map<String, String> params = RequestUtils.queryToMap(query);

    String token = params.get("token");
    String eventId = params.get("event_id");

    Wallet issuerWallet = null;
    Role accountHolder = null;
    String issuerDid = null;
    String response = "Succesfully verified and signed";
    int responseCode = 200;

    try {
      issuerWallet = SessionManager.getSessionCredentials(token).getWallet();
      issuerDid = SessionManager.getSessionCredentials(token).getDid();
    } catch (SessionInvalidException e) {
      e.printStackTrace();
      response = "Invalid session token";
      responseCode =  RequestUtils.statusSessionExpired();
    } catch (IndyException e) {
      e.printStackTrace();
    }

    EventNode event = EventStorage.getEvent(issuerDid, eventId);
    JSONObject payload = event.getPayload();

    String username = payload.getString("username");
    String password = payload.getString("password");

    String walletId = Crypto.hashPlainText(username);
    String walletKey = Crypto.hashPlainText(password);
    String did = Crypto.getDid(username);

    if(issuerWallet == null || issuerDid == null) {
      httpExchange.sendResponseHeaders(responseCode, response.length());
      OutputStream os = httpExchange.getResponseBody();
      os.write(response.getBytes());
      os.close();
      return false;
    }

    try {
      accountHolder = createAccountHolder(createVerifier(issuerWallet, issuerDid, null), did, walletId, walletKey);
    } catch (IndyException e) {
      e.printStackTrace();
      response = "Error creating the account";
      responseCode = 400;
    } catch (ExecutionException e) {
      e.printStackTrace();
      response = "Error creating the account";
      responseCode = 400;
    } catch (InterruptedException e) {
      e.printStackTrace();
      response = "Internal server error";
      responseCode = 500;
    }

    if(accountHolder != null) {
      try {
        accountHolder.closeWallet();
      } catch (Exception e) {
        e.printStackTrace();
        response = "Internal server error";
        responseCode = 500;
      }
    }

    httpExchange.sendResponseHeaders(responseCode, response.length());
    OutputStream os = httpExchange.getResponseBody();
    os.write(response.getBytes());
    os.close();
    return true;
  }
}
