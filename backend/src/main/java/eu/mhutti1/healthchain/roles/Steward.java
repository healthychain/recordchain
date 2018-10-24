package eu.mhutti1.healthchain.roles;

import eu.mhutti1.healthchain.constants.Constants;
import eu.mhutti1.healthchain.wallet.IndyWallet;
import org.hyperledger.indy.sdk.IndyException;
import org.hyperledger.indy.sdk.did.Did;
import org.hyperledger.indy.sdk.did.DidResults;
import org.hyperledger.indy.sdk.pool.Pool;
import org.hyperledger.indy.sdk.wallet.Wallet;

import java.util.concurrent.ExecutionException;

import static org.hyperledger.indy.sdk.ledger.Ledger.buildNymRequest;
import static org.hyperledger.indy.sdk.ledger.Ledger.signAndSubmitRequest;

/**
 * Created by jedraz on 24/10/2018.
 */
public class Steward extends Role{

  public Steward(Wallet wallet, String did, String verKey) {
    super(wallet, did, verKey);
  }

  public Steward(Pool pool, Role role) throws IndyException, ExecutionException, InterruptedException {
    super();

    System.out.println("Steward DID: " + this.did + " Steward Verkey: " + this.verKey);
    System.out.println("Build NYM request to add Trust Anchor to the ledger\n");

    String nymRequest = buildNymRequest(role.getDid(), this.did, this.verKey, null, Constants.STEWARD).get();

    System.out.println("NYM request JSON:\n" + nymRequest);

    String nymResponseJson = signAndSubmitRequest(pool, role.getWallet(), this.did, nymRequest).get();
    System.out.println("NYM transaction response:\n" + nymResponseJson);
  }
}
