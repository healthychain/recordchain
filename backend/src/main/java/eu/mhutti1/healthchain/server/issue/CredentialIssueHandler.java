package eu.mhutti1.healthchain.server.issue;

import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpHandler;
import eu.mhutti1.healthchain.server.RequestUtils;
import eu.mhutti1.healthchain.server.session.SessionInvalidException;
import eu.mhutti1.healthchain.server.session.SessionManager;
import org.hyperledger.indy.sdk.anoncreds.Anoncreds;
import org.hyperledger.indy.sdk.anoncreds.AnoncredsResults;
import org.hyperledger.indy.sdk.wallet.Wallet;

import java.io.IOException;
import java.util.Map;

/**
 * Created by jedraz on 30/10/2018.
 */
public class CredentialIssueHandler implements HttpHandler {

  @Override
  public void handle(HttpExchange httpExchange) throws IOException {

    httpExchange.getResponseHeaders().add("Access-Control-Allow-Origin", "*");

    String query = httpExchange.getRequestURI().getQuery();
    Map<String, String> params = RequestUtils.queryToMap(query);

    String token = params.get("token");

    Wallet issuerWallet = null;
    //get from local db
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

    String cred_values = "{\n" +
            "        \"sex\": {\"raw\": \"male\", \"encoded\": \"5944657099558967239210949258394887428692050081607692519917050\"},\n" +
            "        \"name\": {\"raw\": \"Alex\", \"encoded\": \"1139481716457488690172217916278103335\"},\n" +
            "        \"height\": {\"raw\": \"175\", \"encoded\": \"175\"},\n" +
            "        \"age\": {\"raw\": \"28\", \"encoded\": \"28\"}\n" +
            "    }";

//    // Issuer create Credential
//    AnoncredsResults.IssuerCreateCredentialResult createCredentialResult =
//            Anoncreds.issuerCreateCredential(issuerWallet, credOfferJSON, createCredReqResult.getCredentialRequestJson(),
//                    cred_values, null, - 1).get();
//    String credential = createCredentialResult.getCredentialJson();
  }
}
