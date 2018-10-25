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
public class TrustAnchor extends Role{

  public TrustAnchor(Wallet wallet, String did, String verKey) {
    super(wallet, did, verKey);
  }


  public TrustAnchor(Pool pool, Role role) throws IndyException, ExecutionException, InterruptedException {
    super();

    System.out.println("Trust anchor DID: " + this.getDid() + " Trust anchor Verkey: " + this.getVerKey());
    System.out.println("Build NYM request to add Trust Anchor to the ledger\n");

    String nymRequest = buildNymRequest(role.getDid(), this.getDid(), this.getVerKey(), null, Constants.TRUST_ANCHOR).get();

    System.out.println("NYM request JSON:\n" + nymRequest);

    String nymResponseJson = signAndSubmitRequest(pool, role.getWallet(), role.getDid(), nymRequest).get();
    System.out.println("NYM transaction response:\n" + nymResponseJson);

  }

}
