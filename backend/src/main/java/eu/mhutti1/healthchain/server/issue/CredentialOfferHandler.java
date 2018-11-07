package eu.mhutti1.healthchain.server.issue;

import com.sun.net.httpserver.HttpExchange;
import eu.mhutti1.healthchain.constants.HealthRecord;
import eu.mhutti1.healthchain.server.RequestUtils;
import eu.mhutti1.healthchain.server.events.EventConsumer;
import eu.mhutti1.healthchain.server.session.SessionInvalidException;
import eu.mhutti1.healthchain.server.session.SessionManager;
import eu.mhutti1.healthchain.storage.CredDefStorage;
import eu.mhutti1.healthchain.storage.EventNode;
import eu.mhutti1.healthchain.storage.EventStorage;
import eu.mhutti1.healthchain.utils.Crypto;
import org.apache.commons.lang3.RandomStringUtils;
import org.hyperledger.indy.sdk.IndyException;
import org.hyperledger.indy.sdk.anoncreds.Anoncreds;
import org.hyperledger.indy.sdk.anoncreds.AnoncredsResults;
import org.hyperledger.indy.sdk.wallet.Wallet;
import org.json.JSONObject;

import java.io.IOException;
import java.io.OutputStream;
import java.util.Map;
import java.util.concurrent.ExecutionException;

import static org.hyperledger.indy.sdk.anoncreds.Anoncreds.issuerCreateAndStoreCredentialDef;

/**
 * Created by jedraz on 29/10/2018.
 */
public class CredentialOfferHandler extends EventConsumer {


  @Override
  public boolean handleEventAction(HttpExchange httpExchange) throws IOException {

    httpExchange.getResponseHeaders().add("Access-Control-Allow-Origin", "*");

    String query = httpExchange.getRequestURI().getQuery();
    Map<String, String> params = RequestUtils.queryToMap(query);

    String token = params.get("token");
    String proverUsername = params.get("prover_username");
    String proverDid = Crypto.getDid(proverUsername);

    Wallet issuerWallet = null;
    String issuerDid = null;
    AnoncredsResults.IssuerCreateAndStoreCredentialDefResult credDef = null;
    String credOfferJSON = null;

    String response = RequestUtils.messageOK();
    int responseCode = RequestUtils.statusOK();

    try {
      issuerWallet = SessionManager.getSessionCredentials(token).getWallet();
      issuerDid = SessionManager.getSessionCredentials(token).getDid();
    } catch (SessionInvalidException e) {
      response = "Invalid session token";
      responseCode = RequestUtils.statusSessionExpired();
    }

    if(issuerWallet == null) {
      httpExchange.sendResponseHeaders(responseCode, response.length());
      OutputStream os = httpExchange.getResponseBody();
      os.write(response.getBytes());
      os.close();
      return false;
    }

    System.out.println("Create credential offer\n");
    String credDefJSON = "{\"seqNo\": 2, \"dest\": \"" + proverDid + "\", \"data\": " + HealthRecord.getSchemaDataJSON() + "}";
    System.out.println("Cred Def JSON:\n" + credDefJSON);

    try {
      credDef = issuerCreateAndStoreCredentialDef(
              issuerWallet,
              issuerDid,
              HealthRecord.getSchemaDataJSON(),
          RandomStringUtils.randomAlphabetic(12),
              "CL",
              "{\"support_revocation\": false}"
      ).get();

      CredDefStorage.getStore().put(proverDid, new CredDefStorage.CredDef(credDef.getCredDefId(), credDef.getCredDefJson()));
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

    if(credDef == null) {
      httpExchange.sendResponseHeaders(responseCode, response.length());
      OutputStream os = httpExchange.getResponseBody();
      os.write(response.getBytes());
      os.close();
      return false;
    }

    System.out.println("Returned Cred Definition:\n" + credDef);

    try {
      credOfferJSON = Anoncreds.issuerCreateCredentialOffer(issuerWallet, credDef.getCredDefId()).get();
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

    if (credOfferJSON == null) {
      httpExchange.sendResponseHeaders(responseCode, response.length());
      OutputStream os = httpExchange.getResponseBody();
      os.write(response.getBytes());
      os.close();
      return false;
    }

    JSONObject payload = new JSONObject()
            .put("credOfferJSON", credOfferJSON)
            .put("credDefJSON", credDef.getCredDefJson());

    EventStorage.store(proverDid, new EventNode("", issuerDid, payload, "credential_request", null));

    httpExchange.sendResponseHeaders(responseCode, response.length());
    OutputStream os = httpExchange.getResponseBody();
    os.write(response.getBytes());
    os.close();
    return true;
  }
}
