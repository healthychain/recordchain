package eu.mhutti1.healthchain.server.create;

import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpHandler;
import eu.mhutti1.healthchain.roles.Role;
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
public abstract class CreateHandler implements HttpHandler {

  public abstract Role createVerifier(Wallet wallet, String did, String verKey);

  public abstract Role createAccountHolder(Role role, String walletId, String walletKey) throws InterruptedException, ExecutionException, IndyException;

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

    String response = "Account created";
    int responseCode = 200;

    Wallet issuerWallet = null;
    Role accountHolder = null;
    String walletId = String.valueOf(password.concat(username).hashCode());
    String key = String.valueOf(password.hashCode());

    try {
      issuerWallet = IndyWallet.openWallet(issuerWalletId, issuerWalletKey);
    } catch (IndyException e) {
      response = "Authority credentials invalid";
      responseCode = 400;
    } catch (ExecutionException e) {
      response = "Authority credentials invalid";
      responseCode = 400;
    } catch (InterruptedException e) {
      e.printStackTrace();
      response = "Internal server error";
      responseCode = 500;
    }

    if(issuerWallet == null) {
      httpExchange.sendResponseHeaders(responseCode, response.length());
      OutputStream os = httpExchange.getResponseBody();
      os.write(response.getBytes());
      os.close();
      return;
    }

    try {
      accountHolder = createAccountHolder(createVerifier(issuerWallet, issuerDid, null), walletId, key);
    } catch (IndyException e) {
      response = "Error creating the account";
      responseCode = 400;
    } catch (ExecutionException e) {
      response = "Error creating the account";
      responseCode = 400;
    } catch (InterruptedException e) {
      e.printStackTrace();
      response = "Internal server error";
      responseCode = 500;
    }

    try {
      issuerWallet.closeWallet();
    } catch (IndyException e) {
      e.printStackTrace();
      response = "Internal server error";
      responseCode = 500;
    }

    if(accountHolder != null) {
      try {
        accountHolder.closeWallet();
      } catch (Exception e) {
        response = "Internal server error";
        responseCode = 500;
      }
    }

    httpExchange.sendResponseHeaders(responseCode, response.length());
    OutputStream os = httpExchange.getResponseBody();
    os.write(response.getBytes());
    os.close();
  }
}
