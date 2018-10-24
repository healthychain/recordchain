package eu.mhutti1.healthchain;

import static eu.mhutti1.healthchain.constants.Constants.*;
import static org.hyperledger.indy.sdk.anoncreds.Anoncreds.issuerCreateAndStoreCredentialDef;
import static org.hyperledger.indy.sdk.ledger.Ledger.*;

import java.util.concurrent.ExecutionException;

import eu.mhutti1.healthchain.constants.Constants;
import eu.mhutti1.healthchain.roles.IdentityOwner;
import eu.mhutti1.healthchain.roles.Steward;
import eu.mhutti1.healthchain.roles.TrustAnchor;
import org.hyperledger.indy.sdk.IndyException;
import org.hyperledger.indy.sdk.anoncreds.Anoncreds;
import org.hyperledger.indy.sdk.anoncreds.AnoncredsResults;
import org.hyperledger.indy.sdk.did.Did;
import org.hyperledger.indy.sdk.did.DidResults;
import org.hyperledger.indy.sdk.pool.Pool;
import org.hyperledger.indy.sdk.pool.PoolJSONParameters;
import org.hyperledger.indy.sdk.wallet.Wallet;
import org.json.JSONArray;
import org.json.JSONObject;

public class Main {


  public static void main(String[] args) throws Exception {

    Pool pool = getPool();
    Wallet wallet = getWallet();

    //this is hardcoded steward from genesis transaction file
    String did_json = "{\"seed\": \"" + STEWARD_SEED + "\"}";
    DidResults.CreateAndStoreMyDidResult stewardResult = Did.createAndStoreMyDid(wallet, did_json).get();

    Steward steward = new Steward(wallet, stewardResult.getDid(), stewardResult.getVerkey());
    TrustAnchor doctor = new TrustAnchor(pool, steward);

    IdentityOwner client = new IdentityOwner(pool, doctor);

    String getNymRequest = buildGetNymRequest(client.getDid(), doctor.getDid()).get();
    String getNymResponse = submitRequest(pool, getNymRequest).get();

    String responseData = new JSONObject(getNymResponse).getJSONObject("result").getString("data");
    String trustAnchorVerkeyFromLedger = new JSONObject(responseData).getString("verkey");

    System.out.println("Written by Steward: " + doctor.getVerKey());
    System.out.println("Queried from Ledger: " + trustAnchorVerkeyFromLedger);

  }

  public static Pool getPool() throws IndyException, InterruptedException, ExecutionException {
    Pool.setProtocolVersion(Constants.PROTOCOL_VERSION);

    // Tell SDK which pool you are going to use. You should have already started
    // this pool using docker compose or similar.
    try {
      Pool.createPoolLedgerConfig(POOL_NAME, POOL_CONFIG).get();
    } catch (ExecutionException e) {
      Pool.deletePoolLedgerConfig(POOL_NAME).get();
      Pool.createPoolLedgerConfig(POOL_NAME, POOL_CONFIG).get();

    }

    System.out.println("\n2. Open pool ledger and get the pool handle from libindy.\n");
    return Pool.openPoolLedger(POOL_NAME, "{}").get();
  }

  public static Wallet getWallet() throws IndyException, ExecutionException, InterruptedException {
    System.out.println("\n3. Creates a new identity wallet\n");
    try {
      Wallet.createWallet(WALLET_CONFIG, WALLET_CREDS).get();
    } catch (ExecutionException e) {
      Wallet.deleteWallet(WALLET_CONFIG, WALLET_CREDS).get();
      Wallet.createWallet(WALLET_CONFIG, WALLET_CREDS).get();
    }

    System.out.println("\n4. Open identity wallet and get the wallet handle from libindy\n");
    return Wallet.openWallet(WALLET_CONFIG, WALLET_CREDS).get();
  }

  public static String getDefaultStewardDid(Wallet wallet) throws IndyException, ExecutionException, InterruptedException {

    // First, put a steward DID and its keypair in the wallet. This doesn't write anything to the ledger,
    // but it gives us a key that we can use to sign a ledger transaction that we're going to submit later.
    System.out.println("\n5. Generating and storing steward DID and Verkey\n");

    // The DID and public verkey for this steward key are already in the ledger; they were part of the genesis
    // transactions we told the SDK to start with in the previous step. But we have to also put the DID, verkey,
    // and private signing key into our wallet, so we can use the signing key to submit an acceptably signed
    // transaction to the ledger, creating our *next* DID (which is truly new). This is why we use a hard-coded seed
    // when creating this DID--it guarantees that the same DID and key material are created that the genesis txns
    // expect.
    String did_json = "{\"seed\": \"" + STEWARD_SEED + "\"}";
    DidResults.CreateAndStoreMyDidResult stewardResult = Did.createAndStoreMyDid(wallet, did_json).get();
    String defaultStewardDid = stewardResult.getDid();
    System.out.println("StewardPermissions DID: " + defaultStewardDid);
    System.out.println("StewardPermissions Verkey: " + stewardResult.getVerkey());
    return defaultStewardDid;
  }

  public static DidResults.CreateAndStoreMyDidResult getTrustAnchorResult(Wallet wallet) throws IndyException, ExecutionException, InterruptedException {

    // Now, create a new DID and verkey for a trust anchor, and store it in our wallet as well. Don't use a seed;
    // this DID and its keyas are secure and random. Again, we're not writing to the ledger yet.
    System.out.println("\n6. Generating and storing Trust Anchor DID and Verkey\n");
    DidResults.CreateAndStoreMyDidResult trustAnchorResult = Did.createAndStoreMyDid(wallet, "{}").get();
    String trustAnchorDID = trustAnchorResult.getDid();
    String trustAnchorVerkey = trustAnchorResult.getVerkey();
    System.out.println("Trust anchor DID: " + trustAnchorDID);
    System.out.println("Trust anchor Verkey: " + trustAnchorVerkey);
    return trustAnchorResult;
  }

  public static void nymRequest(String defaultStewardDid, DidResults.CreateAndStoreMyDidResult trustAnchorResult, Pool pool, Wallet walletHandle) throws IndyException, ExecutionException, InterruptedException {
    // Here, we are building the transaction payload that we'll send to write the Trust Anchor identity to the ledger.
    // We submit this transaction under the authority of the steward DID that the ledger already recognizes.
    // This call will look up the private key of the steward DID in our wallet, and use it to sign the transaction.
    System.out.println("\n7. Build NYM request to add Trust Anchor to the ledger\n");
    String nymRequest = buildNymRequest(defaultStewardDid, trustAnchorResult.getDid(), trustAnchorResult.getVerkey(), null, "TRUST_ANCHOR").get();
    System.out.println("NYM request JSON:\n" + nymRequest);

    // Now that we have the transaction ready, send it. The building and the sending are separate steps because some
    // clients may want to prepare transactions in one piece of code (e.g., that has access to privileged backend systems),
    // and communicate with the ledger in a different piece of code (e.g., that lives outside the safe internal
    // network).
    System.out.println("\n8. Sending the nym request to ledger\n");
    String nymResponseJson = signAndSubmitRequest(pool, walletHandle, defaultStewardDid, nymRequest).get();
    System.out.println("NYM transaction response:\n" + nymResponseJson);
  }

  public static String getSchemaData(String defaultStewardDid, Pool pool, Wallet wallet) throws IndyException, ExecutionException, InterruptedException {
    System.out.println("\n9. Build the SCHEMA request to add new schema to the ledger as a StewardPermissions\n");
    String name = "gvt";
    String version = "1.0";
    String attributes = "[\"age\", \"sex\", \"height\", \"name\"]";
    String schemaDataJSON = "{\"attrNames\": [\"age\", \"sex\", \"height\", \"name\"], \"ver\": \"1.0\", \"name\": \"gvt\", \"id\": \"1\", \"version\": \"1.0\"}";
    System.out.println("Schema: " + schemaDataJSON);
    String schemaRequest = buildSchemaRequest(defaultStewardDid, schemaDataJSON).get();
    System.out.println("Schema request:\n" + schemaRequest);

    System.out.println("\n10. Sending the SCHEMA request to the ledger\n");
    String schemaResponse = signAndSubmitRequest(pool, wallet, defaultStewardDid, schemaRequest).get();
    System.out.println("Schema response:\n" + schemaResponse);
    return schemaDataJSON;
  }

  public static AnoncredsResults.IssuerCreateAndStoreCredentialDefResult getCredDef(String defaultStewardDid, String schemaDataJSON, Wallet walletHandle, DidResults.CreateAndStoreMyDidResult trustAnchorResult) throws IndyException, ExecutionException, InterruptedException {
    System.out.println("\n11. Creating and storing CRED DEF using anoncreds as Trust Anchor, for the given Schema\n");
    String  credDefJSON = "{\"seqNo\": 1, \"dest\": \"" + defaultStewardDid + "\", \"data\": " + schemaDataJSON + "}";
    System.out.println("Cred Def JSON:\n" + credDefJSON);
    AnoncredsResults.IssuerCreateAndStoreCredentialDefResult credDef = issuerCreateAndStoreCredentialDef(walletHandle, trustAnchorResult.getDid(), schemaDataJSON, "cred_def_tag","CL", "{\"support_revocation\": false}").get();
    System.out.println("Returned Cred Definition:\n" + credDef);
    return credDef;
  }

  public static Wallet createProverWallet(String proverDID, String masterSecretName) throws IndyException, ExecutionException, InterruptedException {
    // 12
    System.out.println("\n12. Creating Prover wallet and opening it to get the handle\n");
    try {
      Wallet.deleteWallet(PROVER_WALLET_CONFIG, WALLET_CREDS);
    } catch (Exception e) {

    }
    Wallet.createWallet(PROVER_WALLET_CONFIG, WALLET_CREDS);
    Wallet proverWalletHandle = Wallet.openWallet(PROVER_WALLET_CONFIG, WALLET_CREDS).get();

    // 13
    System.out.println("\n13. Prover is creating Master Secret\n");
    Anoncreds.proverCreateMasterSecret(proverWalletHandle, masterSecretName).get();

    return proverWalletHandle;
  }

  public static String defineAndIssueClaim(Wallet walletHandle, AnoncredsResults.IssuerCreateAndStoreCredentialDefResult credDef, Wallet proverWalletHandle, String proverDID, String masterSecretName) throws IndyException, ExecutionException, InterruptedException {

    // 14
    System.out.println("\n14. Issuer (Trust Anchor) is creating a Claim Offer for Prover\n");
    String credOfferJSON = Anoncreds.issuerCreateCredentialOffer(walletHandle, credDef.getCredDefId()).get();
    System.out.println("Claim Offer:\n" + credOfferJSON);


    // 15
    System.out.println("\n15. Prover creates Claim Request\n");
    AnoncredsResults.ProverCreateCredentialRequestResult result = Anoncreds.proverCreateCredentialReq(proverWalletHandle, proverDID, credOfferJSON,
        credDef.getCredDefJson(), masterSecretName).get();

    System.out.println("Claim Request:\n" + result.getCredentialRequestJson());

    // 16
    System.out.println("\n16. Issuer (Trust Anchor) creates Claim for Claim Request\n");
    // Encoded value of non-integer attribute is SHA256 converted to decimal
    // note that encoding is not standardized by Indy except that 32-bit integers are encoded as themselves. IS-786
    String credAttribsJson = "{\n" +
        "               \"sex\":[\"male\",\"5944657099558967239210949258394887428692050081607692519917050011144233115103\"],\n" +
        "               \"name\":[\"Alex\",\"992628570,98057710338306967609588410025648622308394250666849665532448612202874\"],\n" +
        "               \"height\":[\"175\",\"175\"],\n" +
        "               \"age\":[\"28\",\"28\"]\n" +
        "        }";
    AnoncredsResults.IssuerCreateCredentialResult createClaimResult = Anoncreds.issuerCreateCredential(walletHandle, credOfferJSON, result.getCredentialRequestJson(),
        credAttribsJson, null,- 1).get();
    String credJSON = createClaimResult.getCredentialJson();
    System.out.println("Claim:\n" + credJSON);

    // 17
    System.out.println("\n17. Prover processes and stores Claim\n");
    Anoncreds.proverStoreCredential(proverWalletHandle, "1", result.getCredentialRequestMetadataJson(), credJSON, credDef.getCredDefJson(), null).get();
    return credJSON;
  }

  public static void tut3() throws IndyException, ExecutionException, InterruptedException {
    Pool pool = getPool();
    Wallet walletHandle = getWallet();
    String defaultStewardDid = getDefaultStewardDid(walletHandle);
    DidResults.CreateAndStoreMyDidResult trustAnchorResult = getTrustAnchorResult(walletHandle);
    nymRequest(defaultStewardDid, trustAnchorResult, pool, walletHandle);
    String schemaJSON = getSchemaData(defaultStewardDid, pool, walletHandle);
    AnoncredsResults.IssuerCreateAndStoreCredentialDefResult credDef = getCredDef(defaultStewardDid, schemaJSON, walletHandle, trustAnchorResult);

    String proverDID = "VsKV7grR1BUE29mG2Fm2kX";
    String masterSecretName = "master_secret";

    Wallet proverWalletHandle = createProverWallet(proverDID, masterSecretName);

    defineAndIssueClaim(walletHandle, credDef, proverWalletHandle, proverDID, masterSecretName);
    // 18
    System.out.println("\n18. Close and delete wallet\n");
    walletHandle.closeWallet().get();
    Wallet.deleteWallet(WALLET_CONFIG, WALLET_CREDS).get();

    // 19
    System.out.println("\n19. Close pool\n");
    pool.closePoolLedger().get();

    // 20
    System.out.println("\n20. Delete pool ledger config\n");
    Pool.deletePoolLedgerConfig(POOL_NAME).get();
  }

  public static void tut2() throws IndyException, ExecutionException, InterruptedException {


    Pool pool = getPool();
    Wallet walletHandle = getWallet();
    String defaultStewardDid = getDefaultStewardDid(walletHandle);
    DidResults.CreateAndStoreMyDidResult trustAnchorResult = getTrustAnchorResult(walletHandle);
    nymRequest(defaultStewardDid, trustAnchorResult, pool, walletHandle);
    String schemaDataJSON = getSchemaData(defaultStewardDid, pool, walletHandle);
    getCredDef(defaultStewardDid, schemaDataJSON, walletHandle, trustAnchorResult);

    // Some cleanup code.
    System.out.println("\n12. Close and delete wallet\n");
    walletHandle.closeWallet().get();
    Wallet.deleteWallet(WALLET_CONFIG, WALLET_CREDS).get();

    System.out.println("\n13. Close pool\n");
    pool.closePoolLedger().get();

    System.out.println("\n14. Delete pool ledger config\n");
    Pool.deletePoolLedgerConfig(POOL_NAME).get();
  }

  public static void tut1() throws IndyException, ExecutionException, InterruptedException {
    System.out.println("Hello World");

    Pool pool = getPool();
    Wallet walletHandle = getWallet();
    String defaultStewardDid = getDefaultStewardDid(walletHandle);
    DidResults.CreateAndStoreMyDidResult trustAnchorResult = getTrustAnchorResult(walletHandle);
    nymRequest(defaultStewardDid, trustAnchorResult, pool, walletHandle);



    // At this point, we have successfully written a new identity to the ledger. Our next step will be to query it.


    // Here we are creating a third DID. This one is never written to the ledger, but we do have to have it in the
    // wallet, because every request to the ledger has to be signed by some requester. By creating a DID here, we
    // are forcing the wallet to allocate a keypair and identity that we can use to sign the request that's going
    // to read the trust anchor's info from the ledger.
    System.out.println("\n9. Generating and storing DID and Verkey to query the ledger with\n");
    DidResults.CreateAndStoreMyDidResult clientResult = Did.createAndStoreMyDid(walletHandle, "{}").get();
    String clientDID = clientResult.getDid();
    String clientVerkey = clientResult.getVerkey();
    System.out.println("Client DID: " + clientDID);
    System.out.println("Client Verkey: " + clientVerkey);

    System.out.println("\n10. Building the GET_NYM request to query Trust Anchor's Verkey as the Client\n");
    String getNymRequest = buildGetNymRequest(clientDID, trustAnchorResult.getDid()).get();
    System.out.println("GET_NYM request json:\n" + getNymRequest);

    System.out.println("\n11. Sending the GET_NYM request to the ledger\n");
    String getNymResponse = submitRequest(pool, getNymRequest).get();
    System.out.println("GET_NYM response json:\n" + getNymResponse);

    // See whether we received the same info that we wrote the ledger in step 4.
    System.out.println("\n12. Comparing Trust Anchor Verkey as written by StewardPermissions and as retrieved in Client's query\n");
    String responseData = new JSONObject(getNymResponse).getJSONObject("result").getString("data");
    String trustAnchorVerkeyFromLedger = new JSONObject(responseData).getString("verkey");
    System.out.println("Written by StewardPermissions: " + trustAnchorResult.getVerkey());
    System.out.println("Queried from Ledger: " + trustAnchorVerkeyFromLedger);
    System.out.println("Matching: " + trustAnchorResult.getVerkey().equals(trustAnchorVerkeyFromLedger));

    // Do some cleanup.
    System.out.println("\n13. Close and delete wallet\n");
    walletHandle.closeWallet().get();
    Wallet.deleteWallet(WALLET_CONFIG, WALLET_CREDS).get();

    System.out.println("\n14. Close pool\n");
    pool.closePoolLedger().get();

    System.out.println("\n15. Delete pool ledger config\n");
    Pool.deletePoolLedgerConfig(POOL_NAME).get();


  }


  public static void tut4() throws IndyException, ExecutionException, InterruptedException {

    Pool pool = getPool();
    Wallet walletHandle = getWallet();
    String defaultStewardDid = getDefaultStewardDid(walletHandle);
    DidResults.CreateAndStoreMyDidResult trustAnchorResult = getTrustAnchorResult(walletHandle);
    nymRequest(defaultStewardDid, trustAnchorResult, pool, walletHandle);
    String schemaJSON = getSchemaData(defaultStewardDid, pool, walletHandle);
    AnoncredsResults.IssuerCreateAndStoreCredentialDefResult credDef = getCredDef(defaultStewardDid, schemaJSON, walletHandle, trustAnchorResult);

      String schema = new JSONObject(String.format("{\"%s\": %s}", credDef.getCredDefId(), credDef.getCredDefJson())).toString();

    JSONObject credDefJsonObject  = new JSONObject(credDef.getCredDefJson());

    String schemaKey = "{\"did\": \"" + defaultStewardDid + "\", \"version\": \"" + new JSONObject(schemaJSON).get("version") + "\", \"name\": \"" + new JSONObject(schemaJSON).get("name")+ "\"}";

    String proverDID = "VsKV7grR1BUE29mG2Fm2kX";
    String issuerDID = "NcYxiDXkpYi6ov5FcYDi1e";
    String masterSecretName = "master_secret";

    Wallet proverWalletHandle = createProverWallet(proverDID, masterSecretName);

    defineAndIssueClaim(walletHandle, credDef, proverWalletHandle, proverDID, masterSecretName);

    System.out.println("9. Prover gets Credentials for Proof Request");
    //todo verify
//    String proofRequestJson = "{\"nonce\": \"123432421212\", \"requested_predicates\": {\"predicate1_referent\": {\"p_type\": \">=\", \"name\": \"age\", \"p_value\": 18, \"restrictions\": [{\"issuer_did\": \"" + issuerDID + "\"}]}}, \"version\": \"0.1\", \"name\": \"proof_req_1\", \"requested_attributes\": {\"attr1_referent\": {\"restrictions\": [{\"schema_key\": " + schemaKey + ", \"issuer_did\": \"" + issuerDID + "\"}], \"name\": \"name\"}}}";

    String proofRequestJson = "{\"nonce\": \"123432421212\", \"requested_predicates\": {\"predicate1_referent\": {\"p_type\": \">=\", \"name\": \"age\", \"p_value\": 18 }}, \"version\": \"0.1\", \"name\": \"proof_req_1\", \"requested_attributes\": {\"attr1_referent\": { \"name\": \"name\"}}}";


    System.out.println("Proof Request: ");
    //CredentialsSearchForProofReq.open(proverWalletHandle, proofRequestJson, null).get().fetchNextCredentials("attr1_referent", 100);
    String credsForProofRequest = Anoncreds.proverGetCredentialsForProofReq(proverWalletHandle, proofRequestJson).get();

    System.out.println("10. Prover creates Proof for Proof Request");
    JSONObject object = new JSONObject(credsForProofRequest);
   //todo
    //    String credForAt1 = (String) object.getJSONObject("attrs").getJSONArray("attr1_referent").get(0);
//    String referent = (String) new JSONArray(object.getJSONObject("attrs").get("attr1_referent")).getJSONObject(0).get("referent");
    System.out.println("Referent: ");

    //todo change referent var
    String chosenClaimsJson = "{\"requested_predicates\": {\"predicate1_referent\": {\"cred_id\": \"1\"}}, \"requested_attrs\": {\"attr1_referent\": [\"1\", true]}, \"self_attested_attributes\": {}}";

    String schemaReferentJSON = "{\"referent\":" + schemaJSON + "}";
//    schemas_json = json.dumps({referent: schema})
    String credDefJson = credDef.getCredDefJson();
    String cdefsJson = "{\"referent\":" + credDefJson + "}";
    String revocRegsJson = "{}";
    //String proofJson = Anoncreds.proverCreateProof(walletHandle, proofRequestJson, chosenClaimsJson, schemaJSON, "link_secret", cdefsJson, revocRegsJson).get();
    String proofJson = Anoncreds.proverCreateProof(walletHandle, proofRequestJson, chosenClaimsJson, "link_secret", schema , new JSONObject(String.format("{\"%s\":%s}", credDef.getCredDefId(), credDef.getCredDefJson())).toString(), new JSONObject("{}").toString()).get();

    String someGuyPerhapsAlex = (String) new JSONObject(proofJson).getJSONObject("requested_proof").getJSONObject("revealed_attrs").getJSONArray("attr1_referent").get(1);

    assert "Alex".equals(someGuyPerhapsAlex);

    System.out.println("11.Verifier is verifying proof from Prover");
    assert Anoncreds.verifierVerifyProof(proofRequestJson, proofJson, schemaJSON, chosenClaimsJson, revocRegsJson, null).get();



    System.out.println("12. Closing both wallet_handles");

    walletHandle.closeWallet().get();
    proverWalletHandle.closeWallet().get();

    System.out.println("13. Deleting created wallet_handles");

    Wallet.deleteWallet(PROVER_WALLET_CONFIG, WALLET_CREDS).get();
    Wallet.deleteWallet(WALLET_CONFIG, WALLET_CREDS).get();

  }

  public static void createWallet() throws Exception {
    // Set protocol version
    Pool.setProtocolVersion(PROTOCOL_VERSION).get();

    // Create and Open Pool


    try {
      Pool.createPoolLedgerConfig(POOL_NAME, POOL_CONFIG).get();
    } catch (ExecutionException e) {
      Pool.deletePoolLedgerConfig(POOL_NAME).get();
      Pool.createPoolLedgerConfig(POOL_NAME, POOL_CONFIG).get();

    }

    PoolJSONParameters.OpenPoolLedgerJSONParameter config2 = new PoolJSONParameters.OpenPoolLedgerJSONParameter(null, null);
    TestContants.pool = Pool.openPoolLedger(POOL_NAME, config2.toJson()).get();


    // Issuer Create and Open wallet
    Wallet.createWallet(TestContants.issuerWalletConfig, TestContants.WALLET_CREDENTIALS).get();
    TestContants.issuerWallet = Wallet.openWallet(TestContants.issuerWalletConfig, TestContants.WALLET_CREDENTIALS).get();

    // Prover Create and Open wallet
    Wallet.createWallet(TestContants.proverWalletConfig, TestContants.WALLET_CREDENTIALS).get();
    TestContants.proverWallet = Wallet.openWallet(TestContants.proverWalletConfig, TestContants.WALLET_CREDENTIALS).get();
  }

  public static void tut4_test() throws Exception {

    try {
      createWallet();
    } catch (Exception e) {
      e.printStackTrace();
    }

    AnoncredsResults.IssuerCreateSchemaResult createSchemaResult = Anoncreds.issuerCreateSchema(TestContants.issuerDid, TestContants.GVT_SCHEMA_NAME, TestContants.SCHEMA_VERSION, TestContants.GVT_SCHEMA_ATTRIBUTES).get();
    String gvtSchemaId = createSchemaResult.getSchemaId();
    String gvtSchema = createSchemaResult.getSchemaJson();

    // Issuer create CredentialDef
    AnoncredsResults.IssuerCreateAndStoreCredentialDefResult createCredDefResult = Anoncreds.issuerCreateAndStoreCredentialDef(TestContants.issuerWallet, TestContants.issuerDid, gvtSchema, TestContants.TAG, null, TestContants.DEFAULT_CRED_DEF_CONFIG).get();
    String credDefId = createCredDefResult.getCredDefId();
    String credDef = createCredDefResult.getCredDefJson();

    // Prover create Master Secret
    Anoncreds.proverCreateMasterSecret(TestContants.proverWallet, TestContants.masterSecretId).get();

    // Issuer create Credential Offer
    String credOffer = Anoncreds.issuerCreateCredentialOffer(TestContants.issuerWallet, credDefId).get();

    // Prover create CredentialReq
    AnoncredsResults.ProverCreateCredentialRequestResult createCredReqResult = Anoncreds.proverCreateCredentialReq(TestContants.proverWallet, TestContants.proverDid, credOffer, credDef, TestContants.masterSecretId).get();
    String credReq = createCredReqResult.getCredentialRequestJson();
    String credReqMetadata = createCredReqResult.getCredentialRequestMetadataJson();

    // Issuer create Credential
    AnoncredsResults.IssuerCreateCredentialResult createCredentialResult =
        Anoncreds.issuerCreateCredential(TestContants.issuerWallet, credOffer, credReq, TestContants.gvtCredentialValues, null, - 1).get();
    String credential = createCredentialResult.getCredentialJson();

    // Prover store Credential
    Anoncreds.proverStoreCredential(TestContants.proverWallet, TestContants.credentialId1, credReqMetadata, credential, credDef, null).get();

    // Prover gets Credentials for Proof Request
    String proofRequestJson = new JSONObject("{" +
        "                    \"nonce\":\"123432421212\",\n" +
        "                    \"name\":\"proof_req_1\",\n" +
        "                    \"version\":\"0.1\", " +
        "                    \"requested_attributes\": {" +
        "                          \"attr1_referent\":{\"name\":\"name\"}," +
        "                          \"attr2_referent\":{\"name\":\"sex\"}," +
        "                          \"attr3_referent\":{\"name\":\"phone\"}" +
        "                     }," +
        "                    \"requested_predicates\":{" +
        "                         \"predicate1_referent\":{\"name\":\"age\",\"p_type\":\">=\",\"p_value\":18}" +
        "                    }" +
        "                  }").toString();

    String credentialsForProofJson = Anoncreds.proverGetCredentialsForProofReq(TestContants.proverWallet, proofRequestJson).get();

    JSONObject credentialsForProof = new JSONObject(credentialsForProofJson);
    JSONArray credentialsForAttribute1 = credentialsForProof.getJSONObject("attrs").getJSONArray("attr1_referent");
    JSONArray credentialsForAttribute2 = credentialsForProof.getJSONObject("attrs").getJSONArray("attr2_referent");
    JSONArray credentialsForAttribute3 = credentialsForProof.getJSONObject("attrs").getJSONArray("attr3_referent");
    JSONArray credentialsForPredicate = credentialsForProof.getJSONObject("predicates").getJSONArray("predicate1_referent");


    String credentialUuid = credentialsForAttribute1.getJSONObject(0).getJSONObject("cred_info").getString("referent");

    // Prover create Proof
    String selfAttestedValue = "8-800-300";
    String requestedCredentialsJson = new JSONObject(String.format("{\n" +
        "                                          \"self_attested_attributes\":{\"attr3_referent\":\"%s\"},\n" +
        "                                          \"requested_attributes\":{\"attr1_referent\":{\"cred_id\":\"%s\", \"revealed\":true},\n" +
        "                                                                    \"attr2_referent\":{\"cred_id\":\"%s\", \"revealed\":false}},\n" +
        "                                          \"requested_predicates\":{\"predicate1_referent\":{\"cred_id\":\"%s\"}}\n" +
        "                                        }", selfAttestedValue, credentialUuid, credentialUuid, credentialUuid)).toString();

    String schemas = new JSONObject(String.format("{\"%s\":%s}", gvtSchemaId, gvtSchema)).toString();
    String credentialDefs = new JSONObject(String.format("{\"%s\":%s}", credDefId, credDef)).toString();
    String revocStates = new JSONObject("{}").toString();

    String proofJson = Anoncreds.proverCreateProof(TestContants.proverWallet, proofRequestJson, requestedCredentialsJson,
        TestContants.masterSecretId, schemas, credentialDefs, revocStates).get();
    JSONObject proof = new JSONObject(proofJson);

    // Verifier verify Proof
    JSONObject revealedAttr1 = proof.getJSONObject("requested_proof").getJSONObject("revealed_attrs").getJSONObject("attr1_referent");
    assert "Alex".equals(revealedAttr1.getString("raw"));

    String revocRegDefs = new JSONObject("{}").toString();
    String revocRegs = new JSONObject("{}").toString();

    Boolean valid = Anoncreds.verifierVerifyProof(proofRequestJson, proofJson, schemas, credentialDefs, revocRegDefs, revocRegs).get();
    assert valid;
  }




}
