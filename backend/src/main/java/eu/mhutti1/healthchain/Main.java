package eu.mhutti1.healthchain;

import static eu.mhutti1.healthchain.constants.Constants.*;
import static org.hyperledger.indy.sdk.anoncreds.Anoncreds.issuerCreateAndStoreCredentialDef;
import static org.hyperledger.indy.sdk.ledger.Ledger.*;

import java.util.concurrent.ExecutionException;

import eu.mhutti1.healthchain.constants.IndyPool;
import eu.mhutti1.healthchain.roles.IdentityOwner;
import eu.mhutti1.healthchain.roles.Steward;
import eu.mhutti1.healthchain.roles.TrustAnchor;
import eu.mhutti1.healthchain.constants.HealthRecord;
import eu.mhutti1.healthchain.server.Server;
import org.hyperledger.indy.sdk.IndyException;
import org.hyperledger.indy.sdk.anoncreds.Anoncreds;
import org.hyperledger.indy.sdk.anoncreds.AnoncredsResults;
import org.hyperledger.indy.sdk.did.Did;
import org.hyperledger.indy.sdk.did.DidResults;
import org.hyperledger.indy.sdk.wallet.Wallet;
import org.json.JSONObject;

public class Main {


  public static void main(String[] args) throws Exception {

    Wallet wallet = getWallet();

    //this is hardcoded steward from genesis transaction file
    String did_json = "{\"seed\": \"" + STEWARD_SEED + "\"}";
    DidResults.CreateAndStoreMyDidResult stewardResult = Did.createAndStoreMyDid(wallet, did_json).get();

    Steward steward = new Steward(wallet, stewardResult.getDid(), stewardResult.getVerkey());

    new Server();


//    TrustAnchor doctor = new TrustAnchor(steward);
//
//    IdentityOwner patient = new IdentityOwner(doctor);
//
//    String getNymRequest = buildGetNymRequest(patient.getDid(), doctor.getDid()).get();
//    String getNymResponse = submitRequest(IndyPool.getPoolInstance(), getNymRequest).get();
//
//    String responseData = new JSONObject(getNymResponse).getJSONObject("result").getString("data");
//    String trustAnchorVerkeyFromLedger = new JSONObject(responseData).getString("verkey");
//
//    System.out.println("Written by Steward: " + doctor.getVerKey());
//    System.out.println("Queried from Ledger: " + trustAnchorVerkeyFromLedger);
//
//steward.buildAgndSubmitSchema(new HealthRecord().getSchemaDataJSON());
//
//    String masterSecretId = "master_secret";
//
//    // Issuer create CredentialDef
//    String credDefJSON = "{\"seqNo\": 1, \"dest\": \"" + patient.getDid() + "\", \"data\": " + HealthRecord.getSchemaDataJSON() + "}";
//    System.out.println("Cred Def JSON:\n" + credDefJSON);
//    AnoncredsResults.IssuerCreateAndStoreCredentialDefResult credDef = issuerCreateAndStoreCredentialDef(doctor.getWallet(), doctor.getDid(), new HealthRecord().getSchemaDataJSON(), "cred_def_tag","CL", "{\"support_revocation\": false}").get();
//    System.out.println("Returned Cred Definition:\n" + credDef);
//
//    // Prover create Master Secret
//    Anoncreds.proverCreateMasterSecret(patient.getWallet(), masterSecretId).get();
//
//    // Issuer create Credential Offer
//    String credOfferJSON = Anoncreds.issuerCreateCredentialOffer(doctor.getWallet(), credDef.getCredDefId()).get();
//    System.out.println("Claim Offer:\n" + credOfferJSON);
//
//    // Prover create CredentialReq
//    System.out.println("\nProver creates credential Request\n");
//    AnoncredsResults.ProverCreateCredentialRequestResult createCredReqResult = Anoncreds.proverCreateCredentialReq(patient.getWallet(), patient.getDid(), credOfferJSON,
//            credDef.getCredDefJson(), masterSecretId).get();
//
//
//    String GVT_CRED_VALUES = "{\n" +
//            "        \"sex\": {\"raw\": \"male\", \"encoded\": \"5944657099558967239210949258394887428692050081607692519917050\"},\n" +
//            "        \"name\": {\"raw\": \"Alex\", \"encoded\": \"1139481716457488690172217916278103335\"},\n" +
//            "        \"height\": {\"raw\": \"175\", \"encoded\": \"175\"},\n" +
//            "        \"age\": {\"raw\": \"28\", \"encoded\": \"28\"}\n" +
//            "    }";
//
//    // Issuer create Credential
//    AnoncredsResults.IssuerCreateCredentialResult createCredentialResult =
//            Anoncreds.issuerCreateCredential(doctor.getWallet(), credOfferJSON, createCredReqResult.getCredentialRequestJson(),
//                    GVT_CRED_VALUES, null, - 1).get();
//    String credential = createCredentialResult.getCredentialJson();
//
//    // Prover store Credential
//    Anoncreds.proverStoreCredential(patient.getWallet(), "id1", createCredReqResult.getCredentialRequestMetadataJson(), credential, credDef.getCredDefJson(), null).get();
//
//    System.out.println("Credentials issued successfully");

//    // Prover gets Credentials for Proof Request
//    String proofRequestJson = new JSONObject("{" +
//            "                    \"nonce\":\"123432421212\",\n" +
//            "                    \"name\":\"proof_req_1\",\n" +
//            "                    \"version\":\"0.1\", " +
//            "                    \"requested_attributes\": {" +
//            "                          \"attr1_referent\":{\"name\":\"name\"}," +
//            "                          \"attr2_referent\":{\"name\":\"sex\"}," +
//            "                          \"attr3_referent\":{\"name\":\"phone\"}" +
//            "                     }," +
//            "                    \"requested_predicates\":{" +
  //            "                         \"predicate1_referent\":{\"name\":\"age\",\"p_type\":\">=\",\"p_value\":18}" +
//            "                    }" +
//            "                  }").toString();
//
//    String credentialsForProofJson = Anoncreds.proverGetCredentialsForProofReq(patient.getWallet(), proofRequestJson).get();
//
//    JSONObject credentialsForProof = new JSONObject(credentialsForProofJson);
//    JSONArray credentialsForAttribute1 = credentialsForProof.getJSONObject("attrs").getJSONArray("attr1_referent");
//    JSONArray credentialsForAttribute2 = credentialsForProof.getJSONObject("attrs").getJSONArray("attr2_referent");
//    JSONArray credentialsForAttribute3 = credentialsForProof.getJSONObject("attrs").getJSONArray("attr3_referent");
//    JSONArray credentialsForPredicate = credentialsForProof.getJSONObject("predicates").getJSONArray("predicate1_referent");
//
//    assert (credentialsForAttribute1.length() == 1);
//    assert (credentialsForAttribute2.length() == 1);
//    assert (credentialsForAttribute3.length() == 0);
//    assert (credentialsForPredicate.length() == 1);
//
//    String credentialUuid = credentialsForAttribute1.getJSONObject(0).getJSONObject("cred_info").getString("referent");
//
//    // Prover create Proof
//    String selfAttestedValue = "8-800-300";
//    String requestedCredentialsJson = new JSONObject(String.format("{\n" +
//            "                                          \"self_attested_attributes\":{\"attr3_referent\":\"%s\"},\n" +
//            "                                          \"requested_attributes\":{\"attr1_referent\":{\"cred_id\":\"%s\", \"revealed\":true},\n" +
//            "                                                                    \"attr2_referent\":{\"cred_id\":\"%s\", \"revealed\":false}},\n" +
//            "                                          \"requested_predicates\":{\"predicate1_referent\":{\"cred_id\":\"%s\"}}\n" +
//            "                                        }", selfAttestedValue, credentialUuid, credentialUuid, credentialUuid)).toString();
//
//    String schemas = new JSONObject(String.format("{\"%s\":%s}", gvtSchemaId, gvtSchema)).toString();
//    String credentialDefs = new JSONObject(String.format("{\"%s\":%s}", credDef.getCredDefId(), credDef)).toString();
//    String revocStates = new JSONObject("{}").toString();
//
//    String proofJson = Anoncreds.proverCreateProof(patient.getWallet(), proofRequestJson, requestedCredentialsJson,
//            masterSecretId, schemas, credentialDefs, revocStates).get();
//    JSONObject proof = new JSONObject(proofJson);
//
//    System.out.println("Prover created the proof of credentials");





    steward.closeWallet();
//    Wallet.deleteWallet(WALLET_CONFIG, WALLET_CREDS).get();
//    doctor.closeWallet();
//    doctor.deleteWallet();
//    patient.closeWallet();
//    patient.deleteWallet();

    //housekeeping
//    pool.closePoolLedger().get();
//    Pool.deletePoolLedgerConfig(POOL_NAME).get();


  }

  public static Wallet getWallet() throws IndyException, ExecutionException, InterruptedException {
    System.out.println("Creates a new identity wallet.\n");
    try {
      Wallet.createWallet(WALLET_CONFIG, WALLET_CREDS).get();
    } catch (ExecutionException e) {
      Wallet.deleteWallet(WALLET_CONFIG, WALLET_CREDS).get();
      Wallet.createWallet(WALLET_CONFIG, WALLET_CREDS).get();
    }

    System.out.println("Open identity wallet and get the wallet handle from libindy.\n");
    return Wallet.openWallet(WALLET_CONFIG, WALLET_CREDS).get();
  }


}
