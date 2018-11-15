package eu.mhutti1.healthchain.server.issue;

import com.sun.net.httpserver.HttpExchange;
import eu.mhutti1.healthchain.server.RequestUtils;
import eu.mhutti1.healthchain.server.events.EventConsumer;
import eu.mhutti1.healthchain.server.session.SessionInvalidException;
import eu.mhutti1.healthchain.server.session.SessionManager;
import eu.mhutti1.healthchain.storage.ClaimStorage;
import eu.mhutti1.healthchain.storage.EventStorage;
import org.hyperledger.indy.sdk.IndyException;
import org.hyperledger.indy.sdk.anoncreds.Anoncreds;
import org.hyperledger.indy.sdk.wallet.Wallet;
import org.json.JSONObject;

import java.io.IOException;
import java.io.OutputStream;
import java.util.Map;
import java.util.concurrent.ExecutionException;
import java.util.stream.Collectors;

/**
 * Created by jedraz on 01/11/2018.
 */
public class CredentialStoreHandler extends EventConsumer {
  @Override
  public boolean handleEventAction(HttpExchange httpExchange) throws IOException {

    httpExchange.getResponseHeaders().add("Access-Control-Allow-Origin", "*");

    String query = httpExchange.getRequestURI().getQuery();
    Map<String, String> params = RequestUtils.queryToMap(query);

    String token = params.get("token");
    String eventId = params.get("event_id");

    Wallet proverWallet = null;
    String proverDid = null;

    int responseCode = RequestUtils.statusOK();
    String response = "OK";


    try {
      proverWallet = SessionManager.getSessionCredentials(token).getWallet();
      proverDid = SessionManager.getSessionCredentials(token).getDid();
    } catch (SessionInvalidException e) {
      response = "Invalid session token";
      responseCode = RequestUtils.statusSessionExpired();
    }

    if (proverWallet == null) {
      httpExchange.sendResponseHeaders(responseCode, response.length());
      OutputStream os = httpExchange.getResponseBody();
      os.write(response.getBytes());
      os.close();
      return false;
    }

    JSONObject payload = EventStorage.getEvent(proverDid, eventId).getPayload();
    String credDefJSON = payload.getString("credDefJSON");
    String credential = payload.getString("credential");
    String credentialRequestMetadataJSON = payload.getString("credentialRequestMetadataJSON");

    // Prover store Credential
    try {
      Anoncreds.proverStoreCredential(proverWallet, "id1", credentialRequestMetadataJSON, credential, credDefJSON, null).get();
      JSONObject jsonObject = new JSONObject(credential).getJSONObject("values");
      Map<String, String> values = jsonObject.keySet().stream().collect(Collectors.toMap(a -> a, a -> (String) jsonObject.getJSONObject(a).get("raw")));
      ClaimStorage.getStore().put(proverDid, new ClaimStorage.ClaimDef(values));
      // Store creds in cache for doctor;
      //ClaimStorage.getStore().put(proverDid, )

    } catch (InterruptedException e) {
      e.printStackTrace();
      response = RequestUtils.messageInternalServerError();
      responseCode = RequestUtils.statuSInternalServerError();
    } catch (ExecutionException e) {
      e.printStackTrace();
      response = RequestUtils.messageInternalServerError();
      responseCode = RequestUtils.statuSInternalServerError();
    } catch (IndyException e) {
      response = RequestUtils.messageUnauthorized();
      responseCode = RequestUtils.statusUnauthorized();
    }

    System.out.println("Credentials issued successfully");

    httpExchange.sendResponseHeaders(responseCode, response.length());
    OutputStream os = httpExchange.getResponseBody();
    os.write(response.getBytes());
    os.close();

    return true;
  }
}
