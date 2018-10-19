package eu.mhutti1.healthchain;

import org.hyperledger.indy.sdk.pool.Pool;
import org.hyperledger.indy.sdk.wallet.Wallet;
import org.json.JSONObject;

/**
 * Created by root on 19/10/18.
 */
public class TestContants {
  public static String GVT_CRED_VALUES = "{\n" +
      "        \"sex\": {\"raw\": \"male\", \"encoded\": \"5944657099558967239210949258394887428692050081607692519917050\"},\n" +
      "        \"name\": {\"raw\": \"Alex\", \"encoded\": \"1139481716457488690172217916278103335\"},\n" +
      "        \"height\": {\"raw\": \"175\", \"encoded\": \"175\"},\n" +
      "        \"age\": {\"raw\": \"28\", \"encoded\": \"28\"}\n" +
      "    }";
  public static String GVT_SCHEMA_NAME = "gvt";
  public static String SCHEMA_VERSION = "1.0";
  public static String GVT_SCHEMA_ATTRIBUTES = "[\"name\", \"age\", \"sex\", \"height\"]";
  public static String TAG = "tag1";
  public static String DEFAULT_CRED_DEF_CONFIG = "{\"support_revocation\":false}";
  public static String WALLET_CREDENTIALS = "{\"key\":\"8dvfYSt5d1taSd6yJdpjq4emkwsPDDLYxkNFysFD2cZY\", \"key_derivation_method\":\"RAW\"}";

  public static Pool pool;
  public static String issuerWalletConfig = new JSONObject().put("id", "issuerWallet").toString();
  public static Wallet issuerWallet;
  public static String proverWalletConfig = new JSONObject().put("id", "proverWallet").toString();
  public static Wallet proverWallet;
  public static String masterSecretId = "masterSecretId";
  public static String credentialId1 = "id1";
  public static String credentialId2 = "id2";
  public static String issuerDid = "NcYxiDXkpYi6ov5FcYDi1e";
  public static String proverDid = "CnEDk9HrMnmiHXEV1WFgbVCRteYnPqsJwrTdcZaNhFVW";
  public static String gvtCredentialValues = GVT_CRED_VALUES;
  public static String xyzCredentialValues = new JSONObject("{\n" +
      "        \"status\":{\"raw\":\"partial\", \"encoded\":\"51792877103171595686471452153480627530895\"},\n" +
      "        \"period\":{\"raw\":\"8\", \"encoded\":\"8\"}\n" +
      "    }").toString();
}
