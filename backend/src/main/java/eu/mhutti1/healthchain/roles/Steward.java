package eu.mhutti1.healthchain.roles;

import eu.mhutti1.healthchain.constants.Constants;
import eu.mhutti1.healthchain.constants.IndyPool;
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

  @Override
  public String getRole() {
    return Constants.STEWARD;
  }

}
