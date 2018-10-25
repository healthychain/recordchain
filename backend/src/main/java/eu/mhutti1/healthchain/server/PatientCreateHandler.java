package eu.mhutti1.healthchain.server;

import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpHandler;
import eu.mhutti1.healthchain.roles.IdentityOwner;
import eu.mhutti1.healthchain.roles.Role;
import eu.mhutti1.healthchain.roles.TrustAnchor;
import eu.mhutti1.healthchain.wallet.IndyWallet;
import org.apache.commons.lang3.RandomStringUtils;
import org.hyperledger.indy.sdk.IndyException;
import org.hyperledger.indy.sdk.pool.Pool;
import org.hyperledger.indy.sdk.wallet.Wallet;
import org.hyperledger.indy.sdk.wallet.WalletAlreadyOpenedException;
import org.hyperledger.indy.sdk.wallet.WalletExistsException;
import org.hyperledger.indy.sdk.wallet.WalletItemAlreadyExistsException;

import java.io.IOException;
import java.io.OutputStream;
import java.util.Map;
import java.util.concurrent.ExecutionException;

import static eu.mhutti1.healthchain.constants.Constants.WALLET_CONFIG;
import static eu.mhutti1.healthchain.constants.Constants.WALLET_CREDS;

/**
 * Created by jedraz on 25/10/2018.
 */
public class PatientCreateHandler implements HttpHandler {

  private Pool pool;

  public PatientCreateHandler(Pool pool) {
    this.pool = pool;
  }

  @Override
  public void handle(HttpExchange httpExchange) throws IOException {

    String query = httpExchange.getRequestURI().getQuery();
    Map<String, String> params = RequestUtils.queryToMap(query);

    String password = params.get("password");
    String username = params.get("username");

    // trust anchor credentials
    String trustAnchorDid = params.get("trust_anchor_did");
    String trustAnchorWalletId = params.get("trust_anchor_wallet_id");
    String trustAnchorWalletKey = params.get("trust_anchor_wallet_key");

    String response = "";


    try {
      Wallet trustAnchorWallet = IndyWallet.openWallet(trustAnchorWalletId, trustAnchorWalletKey);

      // new user credentials
      String walletId = String.valueOf(password.concat(username).hashCode());
      String key = String.valueOf(password.hashCode());

      //trust anchor
      TrustAnchor doctor = new TrustAnchor(
              trustAnchorWallet,
              trustAnchorDid,
              null);

      IdentityOwner newPatient = new IdentityOwner(pool, doctor, walletId, key);

      trustAnchorWallet.closeWallet();

      response = "Account created";
      httpExchange.sendResponseHeaders(200, response.length());



    } catch (IndyException e) {
      response = "Couldn't load trust anchor credentials";
      httpExchange.sendResponseHeaders(500, response.length());
    } catch (ExecutionException e) {
      response = "Given account already exists";
      httpExchange.sendResponseHeaders(500, response.length());
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
