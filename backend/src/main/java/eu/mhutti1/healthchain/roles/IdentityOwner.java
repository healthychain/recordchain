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

  public IdentityOwner(Pool pool, Role role) throws InterruptedException, ExecutionException, IndyException {

    this.wallet = new IndyWallet().getWallet();

    System.out.println("Create Identity Owner\n");

    DidResults.CreateAndStoreMyDidResult userResult = Did.createAndStoreMyDid(wallet, "{}").get();
    this.did = userResult.getDid();
    this.verKey = userResult.getVerkey();

    System.out.println("User DID: " + this.did + " User Verkey: " + this.verKey);
    System.out.println("Build NYM request to add User to the ledger\n");

    String nymRequest = buildNymRequest(role.getDid(), userResult.getDid(), userResult.getVerkey(), null, Constants.IDENTITY_OWNER).get();

    System.out.println("NYM request JSON:\n" + nymRequest);

    String nymResponseJson = signAndSubmitRequest(pool, role.getWallet(), role.getDid(), nymRequest).get();
    System.out.println("NYM transaction response:\n" + nymResponseJson);

  }

}
