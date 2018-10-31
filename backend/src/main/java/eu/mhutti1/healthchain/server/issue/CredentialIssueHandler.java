package eu.mhutti1.healthchain.server.issue;

import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpHandler;
import org.hyperledger.indy.sdk.anoncreds.Anoncreds;
import org.hyperledger.indy.sdk.anoncreds.AnoncredsResults;

import java.io.IOException;

/**
 * Created by jedraz on 30/10/2018.
 */
public class CredentialIssueHandler implements HttpHandler {

  @Override
  public void handle(HttpExchange httpExchange) throws IOException {

    String cred_values = "{\n" +
            "        \"sex\": {\"raw\": \"male\", \"encoded\": \"5944657099558967239210949258394887428692050081607692519917050\"},\n" +
            "        \"name\": {\"raw\": \"Alex\", \"encoded\": \"1139481716457488690172217916278103335\"},\n" +
            "        \"height\": {\"raw\": \"175\", \"encoded\": \"175\"},\n" +
            "        \"age\": {\"raw\": \"28\", \"encoded\": \"28\"}\n" +
            "    }";

//    // Issuer create Credential
//    AnoncredsResults.IssuerCreateCredentialResult createCredentialResult =
//            Anoncreds.issuerCreateCredential(doctor.getWallet(), credOfferJSON, createCredReqResult.getCredentialRequestJson(),
//                    cred_values, null, - 1).get();
//    String credential = createCredentialResult.getCredentialJson();
  }
}
