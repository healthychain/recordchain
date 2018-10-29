package eu.mhutti1.healthchain.roles;

import eu.mhutti1.healthchain.constants.IndyPool;
import eu.mhutti1.healthchain.wallet.IndyWallet;
import org.hyperledger.indy.sdk.IndyException;
import org.hyperledger.indy.sdk.did.Did;
import org.hyperledger.indy.sdk.did.DidResults;
import org.hyperledger.indy.sdk.pool.Pool;
import org.hyperledger.indy.sdk.wallet.Wallet;

import java.util.concurrent.ExecutionException;

import static org.hyperledger.indy.sdk.ledger.Ledger.buildSchemaRequest;
import static org.hyperledger.indy.sdk.ledger.Ledger.signAndSubmitRequest;

/**
 * Created by jedraz on 24/10/2018.
 */
public abstract class Role {
  private Wallet wallet;
  private IndyWallet indyWallet;
  private String did;
  private String verKey;

  public Role() throws InterruptedException, ExecutionException, IndyException {
    this.indyWallet = new IndyWallet();
    this.wallet = indyWallet.getWallet();
    DidResults.CreateAndStoreMyDidResult result = Did.createAndStoreMyDid(this.wallet, "{}").get();
    this.did = result.getDid();
    this.verKey = result.getVerkey();
  }


  public Role(String walletId, String walletKey) throws InterruptedException, ExecutionException, IndyException {
    this.indyWallet = new IndyWallet(walletId, walletKey);
    this.wallet = indyWallet.getWallet();
    DidResults.CreateAndStoreMyDidResult result = Did.createAndStoreMyDid(this.wallet, "{}").get();
    this.did = result.getDid();
    this.verKey = result.getVerkey();

  }

  public Role(Wallet wallet, String did, String verKey) {
    this.wallet = wallet;
    this.did = did;
    this.verKey = verKey;
  }

  public void buildAndSubmitSchema(String schemaJSON) throws IndyException, ExecutionException, InterruptedException {
    System.out.println("Schema: " + schemaJSON);
    String schemaRequest = buildSchemaRequest(this.did, schemaJSON).get();
    System.out.println("Schema request:\n" + schemaRequest);

    System.out.println("\nSending the SCHEMA request to the ledger\n");
    String schemaResponse = signAndSubmitRequest(IndyPool.getPoolInstance(), this.wallet, this.did, schemaRequest).get();
    System.out.println("Schema response:\n" + schemaResponse);
  }

  public void closeWallet() throws IndyException, ExecutionException, InterruptedException {
    wallet.closeWallet().get();
  }

  public void deleteWallet() throws IndyException, ExecutionException, InterruptedException {
    Wallet.deleteWallet(indyWallet.getWalletConfig(), indyWallet.getWalletCred()).get();
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
