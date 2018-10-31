package eu.mhutti1.healthchain.server.issue;

import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpHandler;
import eu.mhutti1.healthchain.constants.HealthRecord;
import eu.mhutti1.healthchain.server.RequestUtils;
import eu.mhutti1.healthchain.server.session.SessionInvalidException;
import eu.mhutti1.healthchain.server.session.SessionManager;
import org.hyperledger.indy.sdk.IndyException;
import org.hyperledger.indy.sdk.anoncreds.Anoncreds;
import org.hyperledger.indy.sdk.anoncreds.AnoncredsResults;
import org.hyperledger.indy.sdk.wallet.Wallet;

import java.io.IOException;
import java.io.OutputStream;
import java.util.Map;
import java.util.concurrent.ExecutionException;

import static org.hyperledger.indy.sdk.anoncreds.Anoncreds.issuerCreateAndStoreCredentialDef;

/**
 * Created by jedraz on 29/10/2018.
 */
public class CredentialOfferHandler implements HttpHandler {

  @Override
  public void handle(HttpExchange httpExchange) throws IOException {

    httpExchange.getResponseHeaders().add("Access-Control-Allow-Origin", "*");

    String query = httpExchange.getRequestURI().getQuery();
    Map<String, String> params = RequestUtils.queryToMap(query);

    String token = params.get("token");
    String issuerDid = params.get("issuer_did");
    String proverDid = params.get("prover_did");

    Wallet issuerWallet = null;
    AnoncredsResults.IssuerCreateAndStoreCredentialDefResult credDef = null;
    String credOfferJSON = null;

    String response = RequestUtils.messageOK();
    int responseCode = RequestUtils.statusOK();

    try {
      issuerWallet = SessionManager.getSessionCredentials(token).getWallet();
    } catch (SessionInvalidException e) {
      response = "Invalid session token";
      responseCode = 400;
    }

    if(issuerWallet == null) {
      httpExchange.sendResponseHeaders(responseCode, response.length());
      OutputStream os = httpExchange.getResponseBody();
      os.write(response.getBytes());
      os.close();
      return;
    }

    System.out.println("Create credential offer\n");
    String credDefJSON = "{\"seqNo\": 1, \"dest\": \"" + proverDid + "\", \"data\": " + HealthRecord.getSchemaDataJSON() + "}";
    System.out.println("Cred Def JSON:\n" + credDefJSON);

    try {
      credDef = issuerCreateAndStoreCredentialDef(
              issuerWallet,
              issuerDid,
              HealthRecord.getSchemaDataJSON(),
              "cred_def_tag",
              "CL",
              "{\"support_revocation\": false}"
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

    if(credDef == null) {
      httpExchange.sendResponseHeaders(responseCode, response.length());
      OutputStream os = httpExchange.getResponseBody();
      os.write(response.getBytes());
      os.close();
      return;
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
      return;
    }


    // do sth with credOfferJSON and credDef.getCredDefJson()

    httpExchange.sendResponseHeaders(responseCode, response.length());
    OutputStream os = httpExchange.getResponseBody();
    os.write(response.getBytes());
    os.close();
  }
}
