package eu.mhutti1.healthchain;

import org.hyperledger.indy.sdk.pool.PoolJSONParameters;
import org.hyperledger.indy.sdk.wallet.WalletJSONParameters;

/**
 * Created by mhutti1 on 17/10/18.
 */
public class Constants {
  public static String WALLET_NAME = "myWallet";
  public static String PROVER_WALLET_NAME = "prover_wallet";

  public static String POOL_NAME = "pool";
  public static String STEWARD_SEED = "000000000000000000000000Steward1";
  public static String POOL_CONFIG = new PoolJSONParameters.CreatePoolLedgerConfigJSONParameter(Constants.class.getClassLoader().getResource("pool_transaction_genesis").getFile()).toJson();
  public static String WALLET_CONFIG = "{\"id\": \""+ WALLET_NAME + "\"}";
  public static String PROVER_WALLET_CONFIG = "{\"id\": \""+ PROVER_WALLET_NAME + "\"}";

  public static String WALLET_CREDS = "{\"key\": \"wallet_key\"}";
  public static int PROTOCOL_VERSION = 2;

}
