package eu.mhutti1.healthchain.server.session;

import eu.mhutti1.healthchain.wallet.IndyWallet;
import org.hyperledger.indy.sdk.IndyException;
import org.hyperledger.indy.sdk.wallet.Wallet;

import java.sql.Timestamp;
import java.util.concurrent.ExecutionException;

/**
 * Created by jedraz on 31/10/2018.
 */
public class SessionCredentials {
  private final Wallet wallet;
  private Timestamp expires;


  public SessionCredentials(String walletId, String walletKey) throws InterruptedException, ExecutionException, IndyException {
    wallet = IndyWallet.openWallet(walletId, walletKey);
    extendSession();
  }

  public void extendSession() {
    expires = new Timestamp(System.currentTimeMillis() + SessionManager.getSessionDuration());
  }

  public boolean isValid() {
    return expires.before(new Timestamp(System.currentTimeMillis()));
  }
}
