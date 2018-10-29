package eu.mhutti1.healthchain.server.issue;

import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpHandler;
import eu.mhutti1.healthchain.constants.HealthRecord;
import eu.mhutti1.healthchain.server.RequestUtils;
import org.hyperledger.indy.sdk.IndyException;
import org.hyperledger.indy.sdk.anoncreds.Anoncreds;
import org.hyperledger.indy.sdk.anoncreds.AnoncredsResults;
import org.hyperledger.indy.sdk.wallet.Wallet;

import java.io.IOException;
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

    String issuerWalletId = params.get("issuer_wallet_id");
    String issuerWalletKey = params.get("issuer_wallet_key");
    String issuerDid = params.get("issuer_did");
    String proverDid = params.get("prover_did");

    try {
      Wallet issuerWallet = Wallet.openWallet(issuerWalletId, issuerWalletKey).get();
      System.out.println("Create credential offer\n");
      String credDefJSON = "{\"seqNo\": 1, \"dest\": \"" + proverDid + "\", \"data\": " + HealthRecord.getSchemaDataJSON() + "}";
      System.out.println("Cred Def JSON:\n" + credDefJSON);
      AnoncredsResults.IssuerCreateAndStoreCredentialDefResult credDef = issuerCreateAndStoreCredentialDef(
              issuerWallet,
              issuerDid,
              HealthRecord.getSchemaDataJSON(),
              "cred_def_tag",
              "CL",
              "{\"support_revocation\": false}"
      ).get();
      System.out.println("Returned Cred Definition:\n" + credDef);
      String credOfferJSON = Anoncreds.issuerCreateCredentialOffer(issuerWallet, credDef.getCredDefId()).get();
      // do sth with credOfferJSON

    } catch (InterruptedException e) {
      e.printStackTrace();
    } catch (ExecutionException e) {
      e.printStackTrace();
    } catch (IndyException e) {
      e.printStackTrace();
    }


  }
}
