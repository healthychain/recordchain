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

  public IndyWallet() throws IndyException, ExecutionException, InterruptedException {

    String generatedName = RandomStringUtils.randomAlphabetic(16);

    String walletConfig = new JSONObject(String.format("{\"%s\": %s}", "id", generatedName)).toString();
    String walletCred = new JSONObject(String.format("{\"%s\": %s}", "key", generatedName)).toString();

    Wallet.createWallet(walletConfig, walletCred).get();

    this.wallet = Wallet.openWallet(walletConfig, walletCred).get();
  }

  public Wallet getWallet() {
    return wallet;
  }
}
