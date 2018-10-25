package eu.mhutti1.healthchain.wallet;


import org.apache.commons.lang3.RandomStringUtils;
import org.hyperledger.indy.sdk.IndyException;
import org.hyperledger.indy.sdk.wallet.Wallet;
import org.json.JSONObject;

import java.util.concurrent.ExecutionException;

/**
 * Created by jedraz on 24/10/2018.
 */
public class IndyWallet {

  private Wallet wallet;
  private String walletConfig;
  private String walletCred;

  public IndyWallet() throws IndyException, ExecutionException, InterruptedException {

    String generatedName = RandomStringUtils.randomAlphabetic(32);

    this.walletConfig = new JSONObject(String.format("{\"%s\": %s}", "id", generatedName)).toString();
    this.walletCred = new JSONObject(String.format("{\"%s\": %s}", "key", generatedName)).toString();

    Wallet.createWallet(walletConfig, walletCred).get();

    this.wallet = Wallet.openWallet(walletConfig, walletCred).get();
  }

  public Wallet getWallet() {
    return wallet;
  }

  public String getWalletConfig() {
    return walletConfig;
  }

  public String getWalletCred() {
    return walletCred;
  }
}
