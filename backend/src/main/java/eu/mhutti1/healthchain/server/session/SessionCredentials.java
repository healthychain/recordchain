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
  private final String did;
  private Timestamp expires;


  public String getDid() {
    return did;
  }

  public SessionCredentials(String did, String walletId, String walletKey) throws InterruptedException, ExecutionException, IndyException {
    this.did = did;
    this.wallet = IndyWallet.openWallet(walletId, walletKey);

    extendSession();
  }

  public Wallet getWallet() {
    return wallet;
  }

  public void extendSession() {
    this.expires = new Timestamp(System.currentTimeMillis() + SessionManager.getSessionDuration());
  }

  public boolean isValid() {
    return expires.after(new Timestamp(System.currentTimeMillis()));
  }
}
