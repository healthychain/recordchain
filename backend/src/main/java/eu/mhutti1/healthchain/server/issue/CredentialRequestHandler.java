package eu.mhutti1.healthchain.server.issue;

import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpHandler;
import eu.mhutti1.healthchain.server.RequestUtils;
import org.hyperledger.indy.sdk.anoncreds.Anoncreds;
import org.hyperledger.indy.sdk.anoncreds.AnoncredsResults;
import org.hyperledger.indy.sdk.wallet.Wallet;

import java.io.IOException;
import java.util.Map;

/**
 * Created by jedraz on 29/10/2018.
 */
public class CredentialRequestHandler implements HttpHandler {

  @Override
  public void handle(HttpExchange httpExchange) throws IOException {

    httpExchange.getResponseHeaders().add("Access-Control-Allow-Origin", "*");

    String query = httpExchange.getRequestURI().getQuery();
    Map<String, String> params = RequestUtils.queryToMap(query);

    String proverWalletId = params.get("prover_wallet_id");
    String proverWalletKey = params.get("prover_wallet_key");
    String proverDid = params.get("prover_did");
    String masterSecret = params.get("mater_secret");

    Wallet proverWallet = null;
    String credOfferJSON = null;


    // Prover create CredentialReq
//    System.out.println("\nProver creates credential Request\n");
//    AnoncredsResults.ProverCreateCredentialRequestResult createCredReqResult = Anoncreds.proverCreateCredentialReq(proverWallet, proverDid, credOfferJSON,
//            credDef.getCredDefJson(), masterSecret).get();

  }
}
