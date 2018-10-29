package eu.mhutti1.healthchain.server.create;

import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpHandler;
import eu.mhutti1.healthchain.roles.Role;
import eu.mhutti1.healthchain.roles.TrustAnchor;
import eu.mhutti1.healthchain.server.RequestUtils;
import eu.mhutti1.healthchain.wallet.IndyWallet;
import org.hyperledger.indy.sdk.IndyException;
import org.hyperledger.indy.sdk.pool.Pool;
import org.hyperledger.indy.sdk.wallet.Wallet;

import java.io.IOException;
import java.io.OutputStream;
import java.util.Map;
import java.util.concurrent.ExecutionException;

/**
 * Created by jedraz on 29/10/2018.
 */
public abstract class CreateHandler implements HttpHandler {

  private Pool pool;

  public CreateHandler(Pool pool) {
    this.pool = pool;
  }

  public abstract Role createVerifier(Wallet wallet, String did, String verKey);

  public abstract Role createAccountHolder(Pool pool, Role role, String walletId, String walletKey) throws InterruptedException, ExecutionException, IndyException;

  @Override
  public void handle(HttpExchange httpExchange) throws IOException {

    httpExchange.getResponseHeaders().add("Access-Control-Allow-Origin", "*");

    String query = httpExchange.getRequestURI().getQuery();
    Map<String, String> params = RequestUtils.queryToMap(query);

    String password = params.get("password");
    String username = params.get("username");

    String issuerDid = params.get("issuer_did");
    String issuerWalletId = params.get("issuer_wallet_id");
    String issuerWalletKey = params.get("issuer_wallet_key");

    String response = "";

    try {
      Wallet issuerWallet = IndyWallet.openWallet(issuerWalletId, issuerWalletKey);

      String walletId = String.valueOf(password.concat(username).hashCode());
      String key = String.valueOf(password.hashCode());

      Role accountHolder = createAccountHolder(pool, createVerifier(issuerWallet, issuerDid, null), walletId, key);

      issuerWallet.closeWallet();
      accountHolder.closeWallet();

      response = "Account created";
      httpExchange.sendResponseHeaders(200, response.length());
    } catch (IndyException e) {
      response = "Error creating the account";
      httpExchange.sendResponseHeaders(204, response.length());
    } catch (ExecutionException e) {
      response = "Error creating the account";
      httpExchange.sendResponseHeaders(204, response.length());
    } catch (InterruptedException e) {
      e.printStackTrace();
      response = "Internal server error";
      httpExchange.sendResponseHeaders(500, response.length());
    } finally {
      OutputStream os = httpExchange.getResponseBody();
      os.write(response.getBytes());
      os.close();
    }
  }
}
