package eu.mhutti1.healthchain.server;

import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpHandler;
import eu.mhutti1.healthchain.wallet.IndyWallet;
import org.hyperledger.indy.sdk.IndyException;
import org.hyperledger.indy.sdk.pool.Pool;
import org.hyperledger.indy.sdk.wallet.Wallet;

import java.io.IOException;
import java.io.OutputStream;
import java.util.Map;
import java.util.concurrent.ExecutionException;

/**
 * Created by jedraz on 25/10/2018.
 */
public class DoctorVerifyHandler implements HttpHandler {

  private Pool pool;

  public DoctorVerifyHandler(Pool pool) {
    this.pool = pool;
  }

  @Override
  public void handle(HttpExchange httpExchange) throws IOException {

    String query = httpExchange.getRequestURI().getQuery();
    Map<String, String> params = RequestUtils.queryToMap(query);

    String password = params.get("password");
    String username = params.get("username");


    //TODO: better crypto
    String walletId = String.valueOf(password.concat(username).hashCode());
    String key = String.valueOf(password.hashCode());

    String response = "";

    try {
      Wallet doctorWallet = IndyWallet.openWallet(walletId, key);
      doctorWallet.closeWallet();
      response = "Account verified!";
      httpExchange.sendResponseHeaders(200, response.length());
    } catch (IndyException e) {
      e.printStackTrace();
    } catch (ExecutionException e) {
      e.printStackTrace();
    } catch (InterruptedException e) {
      e.printStackTrace();
    } finally {
      OutputStream os = httpExchange.getResponseBody();
      os.write(response.getBytes());
      os.close();
    }
  }
}
