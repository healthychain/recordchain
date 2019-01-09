package eu.mhutti1.healthchain.wallet;


import org.apache.commons.lang3.RandomStringUtils;
import org.hyperledger.indy.sdk.IndyException;
import org.hyperledger.indy.sdk.anoncreds.Anoncreds;
import org.hyperledger.indy.sdk.wallet.Wallet;
import org.hyperledger.indy.sdk.wallet.WalletExistsException;
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
    createAndOpenWallet(generatedName, generatedName);
  }

  public IndyWallet(String id, String key) throws IndyException, ExecutionException, InterruptedException {
    createAndOpenWallet(id, key);
  }

  private void createAndOpenWallet(String id, String key) throws IndyException, ExecutionException, InterruptedException {
    this.walletConfig = new JSONObject(String.format("{\"%s\": \"%s\"}", "id", id)).toString();
    this.walletCred = new JSONObject(String.format("{\"%s\": \"%s\"}", "key", key)).toString();
    Wallet.createWallet(walletConfig, walletCred).get();
    this.wallet = Wallet.openWallet(walletConfig, walletCred).get();
    Anoncreds.proverCreateMasterSecret(this.wallet, "master_secret").get();
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

  public static Wallet openWallet(String id, String key) throws IndyException, ExecutionException, InterruptedException {
    String walletConfig = new JSONObject(String.format("{\"%s\": \"%s\"}", "id", id)).toString();
    String walletCred = new JSONObject(String.format("{\"%s\": \"%s\"}", "key", key)).toString();
    return Wallet.openWallet(walletConfig, walletCred).get();
  }
}
