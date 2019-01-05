package eu.mhutti1.healthchain.server.issue;

import com.sun.net.httpserver.HttpExchange;
import eu.mhutti1.healthchain.server.RequestUtils;
import eu.mhutti1.healthchain.server.events.EventConsumer;
import eu.mhutti1.healthchain.server.events.NonEventConsumer;
import eu.mhutti1.healthchain.server.session.SessionInvalidException;
import eu.mhutti1.healthchain.server.session.SessionManager;
import eu.mhutti1.healthchain.storage.ClaimStorage;
import eu.mhutti1.healthchain.storage.EventNode;
import eu.mhutti1.healthchain.storage.EventStorage;
import eu.mhutti1.healthchain.utils.Crypto;
import org.hyperledger.indy.sdk.IndyException;
import org.hyperledger.indy.sdk.anoncreds.Anoncreds;
import org.hyperledger.indy.sdk.anoncreds.AnoncredsResults;
import org.hyperledger.indy.sdk.wallet.Wallet;
import org.json.JSONObject;

import java.io.IOException;
import java.io.OutputStream;
import java.util.Map;
import java.util.concurrent.ExecutionException;

/**
 * Created by jedraz on 30/10/2018.
 */
public class CredentialCacheHandler extends NonEventConsumer {

  @Override
  public void handle(HttpExchange httpExchange) throws IOException {

    httpExchange.getResponseHeaders().add("Access-Control-Allow-Origin", "*");

    String query = httpExchange.getRequestURI().getQuery();
    Map<String, String> params = RequestUtils.queryToMap(query);

    String token = params.get("token");
    String proverUsername = params.get("prover_username");
    String proverDid = Crypto.getDid(proverUsername);

    Wallet issuerWallet = null;
    String issuerDid = null;

    String response = "{}";
    int responseCode = RequestUtils.statusOK();

    try {
      issuerWallet = SessionManager.getSessionCredentials(token).getWallet();
      issuerDid = SessionManager.getSessionCredentials(token).getDid();
    } catch (SessionInvalidException e) {
      response = "Invalid session token";
      responseCode = RequestUtils.statusSessionExpired();
    } catch (IndyException e) {
      e.printStackTrace();
    }

    if (issuerWallet == null) {
      httpExchange.sendResponseHeaders(responseCode, response.length());
      OutputStream os = httpExchange.getResponseBody();
      os.write(response.getBytes());
      os.close();
    }

    // TODO: verify doctor

    if (ClaimStorage.getStore().get(proverDid) != null) {
      JSONObject responseJ = new JSONObject(ClaimStorage.getStore().get(proverDid).credentials);
      response = responseJ.toString();
    }


    httpExchange.sendResponseHeaders(responseCode, response.length());
    OutputStream os = httpExchange.getResponseBody();
    os.write(response.getBytes());
    os.close();
  }
}
