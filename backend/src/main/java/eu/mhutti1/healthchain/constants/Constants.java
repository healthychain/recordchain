package eu.mhutti1.healthchain.constants;

import org.hyperledger.indy.sdk.pool.PoolJSONParameters;

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

  public static String SERVER_DOMAIN = "localhost:8000";

  //  ROLES

  public static String TRUST_ANCHOR = "TRUST_ANCHOR";
  public static String STEWARD = "STEWARD";
  public static String IDENTITY_OWNER = null;

}
