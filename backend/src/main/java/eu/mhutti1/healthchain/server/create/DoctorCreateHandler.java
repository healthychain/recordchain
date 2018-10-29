package eu.mhutti1.healthchain.server.create;

import eu.mhutti1.healthchain.roles.Role;
import eu.mhutti1.healthchain.roles.Steward;
import eu.mhutti1.healthchain.roles.TrustAnchor;
import org.hyperledger.indy.sdk.IndyException;
import org.hyperledger.indy.sdk.pool.Pool;
import org.hyperledger.indy.sdk.wallet.Wallet;

import java.util.concurrent.ExecutionException;


/**
 * Created by jedraz on 25/10/2018.
 */
public class DoctorCreateHandler extends CreateHandler{


  public DoctorCreateHandler(Pool pool) {
    super(pool);
  }

  @Override
  public Role createVerifier(Wallet wallet, String did, String verKey) {
    return new Steward(wallet, did, verKey);
  }

  @Override
  public Role createAccountHolder(Pool pool, Role role, String walletId, String walletKey) throws InterruptedException, ExecutionException, IndyException {
    return new TrustAnchor(pool, role, walletId, walletKey);
  }


}
