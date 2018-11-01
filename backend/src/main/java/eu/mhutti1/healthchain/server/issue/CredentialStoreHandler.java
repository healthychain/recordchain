package eu.mhutti1.healthchain.server.issue;

import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpHandler;
import eu.mhutti1.healthchain.server.RequestUtils;
import eu.mhutti1.healthchain.server.session.SessionInvalidException;
import eu.mhutti1.healthchain.server.session.SessionManager;
import eu.mhutti1.healthchain.storage.LocalStorage;
import org.hyperledger.indy.sdk.IndyException;
import org.hyperledger.indy.sdk.anoncreds.Anoncreds;
import org.hyperledger.indy.sdk.wallet.Wallet;
import org.json.JSONObject;

import java.io.IOException;
import java.io.OutputStream;
import java.util.Map;
import java.util.concurrent.ExecutionException;

/**
 * Created by jedraz on 01/11/2018.
 */
public class CredentialStoreHandler implements HttpHandler {
  @Override
  public void handle(HttpExchange httpExchange) throws IOException {

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
      responseCode = 400;
    }

    if (proverWallet == null) {
      httpExchange.sendResponseHeaders(responseCode, response.length());
      OutputStream os = httpExchange.getResponseBody();
      os.write(response.getBytes());
      os.close();
      return;
    }

    JSONObject payload = LocalStorage.getEvent(proverDid, eventId).getPayload();
    String credDefJSON = payload.getString("credDefJSON");
    String credential = payload.getString("credential");
    String credentialRequestMetadataJSON = payload.getString("credentialRequestMetadataJSON");

    // Prover store Credential
    try {
      Anoncreds.proverStoreCredential(proverWallet, "id1", credentialRequestMetadataJSON, credential, credDefJSON, null).get();
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

  }
}
