package eu.mhutti1.healthchain.server.issue;

import com.sun.net.httpserver.HttpExchange;
import eu.mhutti1.healthchain.server.events.EventConsumer;
import eu.mhutti1.healthchain.server.RequestUtils;
import eu.mhutti1.healthchain.server.session.SessionInvalidException;
import eu.mhutti1.healthchain.server.session.SessionManager;
import eu.mhutti1.healthchain.storage.EventNode;
import eu.mhutti1.healthchain.storage.LocalStorage;
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
 * Created by jedraz on 29/10/2018.
 */
public class CredentialRequestHandler extends EventConsumer {

  @Override
  public boolean handleEventAction(HttpExchange httpExchange) throws IOException {

    httpExchange.getResponseHeaders().add("Access-Control-Allow-Origin", "*");

    String query = httpExchange.getRequestURI().getQuery();
    Map<String, String> params = RequestUtils.queryToMap(query);

    String token = params.get("token");
    String eventId = params.get("event_id");
//    String masterSecret = params.get("mater_secret");
    String masterSecret = "master_secret";

    Wallet proverWallet = null;
    String proverDid = null;
    AnoncredsResults.ProverCreateCredentialRequestResult createCredReqResult = null;
    String response = RequestUtils.messageOK();
    int responseCode = RequestUtils.statusOK();

    try {
      proverDid = SessionManager.getSessionCredentials(token).getDid();
      proverWallet = SessionManager.getSessionCredentials(token).getWallet();
    } catch (SessionInvalidException e) {
      e.printStackTrace();
      response = "Invalid token";
      responseCode =  RequestUtils.statusSessionExpired();
    }

    if(proverWallet == null || proverDid == null) {
      httpExchange.sendResponseHeaders(responseCode, response.length());
      OutputStream os = httpExchange.getResponseBody();
      os.write(response.getBytes());
      os.close();
      return false;
    }

    JSONObject payload = LocalStorage.getEvent(proverDid, eventId).getPayload();
    String credOfferJSON = payload.getString("credOfferJSON");
    String credDefJSON = payload.getString("credDefJSON");
    String issuerDid = LocalStorage.getEvent(proverDid, eventId).getFromDid();

    System.out.println("\nProver creates credential Request");

    try {
      createCredReqResult = Anoncreds.proverCreateCredentialReq(
              proverWallet,
              proverDid,
              credOfferJSON,
              credDefJSON,
              masterSecret
      ).get();
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

    if (createCredReqResult == null) {
      httpExchange.sendResponseHeaders(responseCode, response.length());
      OutputStream os = httpExchange.getResponseBody();
      os.write(response.getBytes());
      os.close();
      return false;
    }

    // store this shit in the database

    JSONObject newPayload = new JSONObject()
            .put("credentialRequestJSON", createCredReqResult.getCredentialRequestJson())
            .put("credentialRequestMetadataJSON", createCredReqResult.getCredentialRequestMetadataJson())
            .put("credDefJSON", credDefJSON)
            .put("credOfferJSON", credOfferJSON);

    LocalStorage.store(issuerDid, new EventNode("", proverDid, newPayload, "credential_issue", null));

    httpExchange.sendResponseHeaders(responseCode, response.length());
    OutputStream os = httpExchange.getResponseBody();
    os.write(response.getBytes());
    os.close();
    return true;
  }
}
