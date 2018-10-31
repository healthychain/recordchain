package eu.mhutti1.healthchain.server.issue;

import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpHandler;
import eu.mhutti1.healthchain.server.RequestUtils;
import org.hyperledger.indy.sdk.IndyException;
import org.hyperledger.indy.sdk.anoncreds.Anoncreds;
import org.hyperledger.indy.sdk.anoncreds.AnoncredsResults;
import org.hyperledger.indy.sdk.wallet.Wallet;

import java.io.IOException;
import java.io.OutputStream;
import java.util.Map;
import java.util.concurrent.ExecutionException;


/**
 * Created by jedraz on 29/10/2018.
 */
public class CredentialRequestHandler implements HttpHandler {

  @Override
  public void handle(HttpExchange httpExchange) throws IOException {

    httpExchange.getResponseHeaders().add("Access-Control-Allow-Origin", "*");

    String query = httpExchange.getRequestURI().getQuery();
    Map<String, String> params = RequestUtils.queryToMap(query);

    String token = params.get("token");
    String proverDid = params.get("prover_did");
    String masterSecret = params.get("mater_secret");

    Wallet proverWallet = null;
    AnoncredsResults.ProverCreateCredentialRequestResult createCredReqResult = null;
    String credOfferJSON = null; //take from local db
    String credDefJSON = null; // take from local db
    String response = RequestUtils.messageOK();
    int responseCode = RequestUtils.statusOK();

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
      return;
    }

    // store this shit in the database
    createCredReqResult.getCredentialRequestJson();

    httpExchange.sendResponseHeaders(responseCode, response.length());
    OutputStream os = httpExchange.getResponseBody();
    os.write(response.getBytes());
    os.close();
  }
}
