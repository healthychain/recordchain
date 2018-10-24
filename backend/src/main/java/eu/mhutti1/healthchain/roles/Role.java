package eu.mhutti1.healthchain.roles;

import eu.mhutti1.healthchain.wallet.IndyWallet;
import org.hyperledger.indy.sdk.wallet.Wallet;

/**
 * Created by jedraz on 24/10/2018.
 */
public abstract class Role {
  public Wallet wallet;
  public String did;
  public String verKey;

  public Role() {}

  public Role(Wallet wallet, String did, String verKey) {
    this.wallet = wallet;
    this.did = did;
    this.verKey = verKey;
  }

  public Wallet getWallet() {
    return wallet;
  }

  public String getDid() {
    return did;
  }

  public String getVerKey() {
    return verKey;
  }
}
