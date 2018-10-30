package eu.mhutti1.healthchain.server.verify;

import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpHandler;
import eu.mhutti1.healthchain.server.RequestUtils;
import eu.mhutti1.healthchain.wallet.IndyWallet;
import org.hyperledger.indy.sdk.IndyException;
import org.hyperledger.indy.sdk.wallet.Wallet;

import java.io.IOException;
import java.io.OutputStream;
import java.util.Map;
import java.util.concurrent.ExecutionException;

/**
 * Created by jedraz on 29/10/2018.
 */
public abstract class VerifyHandler implements HttpHandler {

  @Override
  public void handle(HttpExchange httpExchange) throws IOException {

    httpExchange.getResponseHeaders().add("Access-Control-Allow-Origin", "*");

    String query = httpExchange.getRequestURI().getQuery();
    Map<String, String> params = RequestUtils.queryToMap(query);

    String password = params.get("password");
    String username = params.get("username");

    String walletId = String.valueOf(password.concat(username).hashCode());
    String key = String.valueOf(password.hashCode());

    String response = "Account verified";
    int responseCode = 200;

    try {
      Wallet wallet = IndyWallet.openWallet(walletId, key);
      wallet.closeWallet();
    } catch (IndyException e) {
      response = "No such account";
      responseCode = 400;
    } catch (ExecutionException e) {
      response = "No such account";
      responseCode = 400;
    } catch (InterruptedException e) {
      e.printStackTrace();
      response = "Internal server error";
      responseCode = 400;
    }

    httpExchange.sendResponseHeaders(responseCode, response.length());
    OutputStream os = httpExchange.getResponseBody();
    os.write(response.getBytes());
    os.close();

  }

}
