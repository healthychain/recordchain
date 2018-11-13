package eu.mhutti1.healthchain.server.create;

import eu.mhutti1.healthchain.roles.IdentityOwner;
import eu.mhutti1.healthchain.roles.Role;
import eu.mhutti1.healthchain.roles.TrustAnchor;
import org.hyperledger.indy.sdk.IndyException;
import org.hyperledger.indy.sdk.wallet.Wallet;

import java.util.concurrent.ExecutionException;

/**
 * Created by jedraz on 31/10/2018.
 */
public class CreateApprovePatientHandler extends CreateApproveHandler {
  @Override
  public Role createVerifier(Wallet wallet, String did, String verKey) {
    return new TrustAnchor(wallet, did, verKey);
  }

  @Override
  public Role createAccountHolder(Role role, String did, String walletId, String walletKey) throws InterruptedException, ExecutionException, IndyException {
    return new IdentityOwner(role, did, walletId, walletKey);
  }
}
