package eu.mhutti1.healthchain.roles;

import eu.mhutti1.healthchain.constants.Constants;
import eu.mhutti1.healthchain.wallet.IndyWallet;
import org.hyperledger.indy.sdk.IndyException;
import org.hyperledger.indy.sdk.did.Did;
import org.hyperledger.indy.sdk.did.DidResults;
import org.hyperledger.indy.sdk.pool.Pool;

import java.util.concurrent.ExecutionException;

import static org.hyperledger.indy.sdk.ledger.Ledger.buildNymRequest;
import static org.hyperledger.indy.sdk.ledger.Ledger.signAndSubmitRequest;

/**
 * Created by jedraz on 24/10/2018.
 */
public class IdentityOwner extends Role{

  public IdentityOwner(Pool pool, Role role, String walletId, String walletKey) throws InterruptedException, ExecutionException, IndyException {
    super(walletId, walletKey);

    System.out.println("User DID: " + this.getDid() + " User Verkey: " + this.getVerKey());
    System.out.println("Build NYM request to add User to the ledger\n");

    String nymRequest = buildNymRequest(role.getDid(), this.getDid(), this.getVerKey(), null, Constants.IDENTITY_OWNER).get();

    System.out.println("NYM request JSON:\n" + nymRequest);

    String nymResponseJson = signAndSubmitRequest(pool, role.getWallet(), role.getDid(), nymRequest).get();
    System.out.println("NYM transaction response:\n" + nymResponseJson);

  }

  public IdentityOwner(Pool pool, Role role) throws InterruptedException, ExecutionException, IndyException {
    super();

    System.out.println("User DID: " + this.getDid() + " User Verkey: " + this.getVerKey());
    System.out.println("Build NYM request to add User to the ledger\n");

    String nymRequest = buildNymRequest(role.getDid(), this.getDid(), this.getVerKey(), null, Constants.IDENTITY_OWNER).get();

    System.out.println("NYM request JSON:\n" + nymRequest);

    String nymResponseJson = signAndSubmitRequest(pool, role.getWallet(), role.getDid(), nymRequest).get();
    System.out.println("NYM transaction response:\n" + nymResponseJson);

  }

}
