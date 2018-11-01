package eu.mhutti1.healthchain.server.issue;

import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpHandler;
import eu.mhutti1.healthchain.server.RequestUtils;
import eu.mhutti1.healthchain.server.session.SessionInvalidException;
import eu.mhutti1.healthchain.server.session.SessionManager;
import org.hyperledger.indy.sdk.IndyException;
import org.hyperledger.indy.sdk.anoncreds.Anoncreds;
import org.hyperledger.indy.sdk.wallet.Wallet;

import java.io.IOException;
import java.io.OutputStream;
import java.util.Map;
import java.util.concurrent.ExecutionException;

/**
 * Created by jedraz on 29/10/2018.
 */
public class CreateMasterKeyHandler implements HttpHandler {

  @Override
  public void handle(HttpExchange httpExchange) throws IOException {

    httpExchange.getResponseHeaders().add("Access-Control-Allow-Origin", "*");

    String query = httpExchange.getRequestURI().getQuery();
    Map<String, String> params = RequestUtils.queryToMap(query);

    String token = params.get("token");
    String masterSecret = params.get("master_secret");

    Wallet proverWallet = null;
    String response = "Master secret created";
    int responseCode = 200;

    try {
      proverWallet = SessionManager.getSessionCredentials(token).getWallet();
    } catch (SessionInvalidException e) {
      response = "Invalid session token";
      responseCode = 400;
    }

    if(proverWallet != null) {
      try {
        Anoncreds.proverCreateMasterSecret(proverWallet, masterSecret).get();
        System.out.println("Write master secret to the wallet\n");
      } catch (InterruptedException e) {
        e.printStackTrace();
        response = "Internal server error";
        responseCode = 500;
      } catch (ExecutionException e) {
        e.printStackTrace();
        response = "Internal server error";
        responseCode = 500;
      } catch (IndyException e) {
        e.printStackTrace();
        response = "Couldn't create the master secret";
        responseCode = 400;
      }
    }

    httpExchange.sendResponseHeaders(responseCode, response.length());
    OutputStream os = httpExchange.getResponseBody();
    os.write(response.getBytes());
    os.close();
  }
}
