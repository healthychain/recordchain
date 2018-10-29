package eu.mhutti1.healthchain.constants;

import eu.mhutti1.healthchain.wallet.IndyWallet;
import org.hyperledger.indy.sdk.IndyException;
import org.hyperledger.indy.sdk.pool.Pool;

import java.util.concurrent.ExecutionException;

import static eu.mhutti1.healthchain.constants.Constants.POOL_CONFIG;
import static eu.mhutti1.healthchain.constants.Constants.POOL_NAME;

/**
 * Created by jedraz on 29/10/2018.
 */
public class IndyPool {

  private static Pool pool;

  public static Pool getPoolInstance() throws InterruptedException, ExecutionException, IndyException {
    if(pool == null){
      pool = createPool();
    }
    return pool;
  }

  private static Pool createPool() throws IndyException, ExecutionException, InterruptedException {
    Pool.setProtocolVersion(Constants.PROTOCOL_VERSION);
    try {
      Pool.createPoolLedgerConfig(POOL_NAME, POOL_CONFIG).get();
    } catch (ExecutionException e) {
      Pool.deletePoolLedgerConfig(POOL_NAME).get();
      Pool.createPoolLedgerConfig(POOL_NAME, POOL_CONFIG).get();

    }
    System.out.println("Open pool ledger and get the pool handle from libindy.\n");
    return Pool.openPoolLedger(POOL_NAME, "{}").get();
  }


}
