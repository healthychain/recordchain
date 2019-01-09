package eu.mhutti1.healthchain.server.proof;

import com.sun.net.httpserver.HttpExchange;
import eu.mhutti1.healthchain.constants.HealthRecord;
import eu.mhutti1.healthchain.roles.Role;
import eu.mhutti1.healthchain.server.RequestUtils;
import eu.mhutti1.healthchain.server.events.EventConsumer;
import eu.mhutti1.healthchain.server.session.SessionInvalidException;
import eu.mhutti1.healthchain.server.session.SessionManager;
import eu.mhutti1.healthchain.storage.CredDefStorage;
import eu.mhutti1.healthchain.storage.EventNode;
import eu.mhutti1.healthchain.storage.EventStorage;
import org.hyperledger.indy.sdk.IndyException;
import org.hyperledger.indy.sdk.anoncreds.Anoncreds;
import org.hyperledger.indy.sdk.anoncreds.AnoncredsResults;
import org.hyperledger.indy.sdk.anoncreds.CredentialsSearchForProofReq;
import org.hyperledger.indy.sdk.wallet.Wallet;
import org.json.JSONArray;
import org.json.JSONObject;

import java.io.IOException;
import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLConnection;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ExecutionException;

/**
 * Created by jedraz on 31/10/2018.
 */
public class ProofApproveHandler extends EventConsumer {

  @Override
  public boolean handleEventAction(HttpExchange httpExchange) throws IOException {
    httpExchange.getResponseHeaders().add("Access-Control-Allow-Origin", "*");

    String query = httpExchange.getRequestURI().getQuery();
    Map<String, String> params = RequestUtils.queryToMap(query);

    String token = params.get("token");
    String eventId = params.get("event_id");
    String masterSecretId = "master_secret";

    Wallet offerWallet = null;
    Role accountHolder = null;
    String offerDid = null;
    String response = "Succesfully verified and signed";
    int responseCode = 200;

    try {
      offerWallet = SessionManager.getSessionCredentials(token).getWallet();
      offerDid = SessionManager.getSessionCredentials(token).getDid();
    } catch (SessionInvalidException e) {
      e.printStackTrace();
      response = "Invalid session token";
      responseCode =  RequestUtils.statusSessionExpired();
    } catch (IndyException e) {
      e.printStackTrace();
    }

    EventNode event = EventStorage.getEvent(offerDid, eventId);
    JSONObject proofRequestJson = event.getPayload();
    String responseDomain = (String) proofRequestJson.remove("response_domain");
    try {
      String credentialsForProofJson = Anoncreds.proverGetCredentialsForProofReq(offerWallet, proofRequestJson.toString()).get();

      JSONObject credentialsForProof = new JSONObject(credentialsForProofJson);
      List<String> credIds = new ArrayList();
      for (int i = 1; credentialsForProof.getJSONObject("attrs").has("attr" + i + "_referent"); i++) {
        JSONArray temp = credentialsForProof.getJSONObject("attrs").getJSONArray("attr" + i + "_referent");
        String credentialUuid = temp.getJSONObject(temp.length() - 1).getJSONObject("cred_info").getString("referent");
        credIds.add(credentialUuid);
      }
      List predIds = new ArrayList();
      for (int i = 1; credentialsForProof.getJSONObject("predicates").has("predicate" + i + "_referent"); i++) {
        JSONArray temp = credentialsForProof.getJSONObject("predicates").getJSONArray("predicate" + i + "_referent");
        String credentialUuid = temp.getJSONObject(temp.length() - 1).getJSONObject("cred_info").getString("referent");
        predIds.add(credentialUuid);
      }
      
      // Prover create Proof
      String selfAttestedValue = "8-800-300";
      JSONObject requestedCredentialsJsonObj = new JSONObject("{\n" +
               "                                          \"self_attested_attributes\":{},\n" +
              "                                          \"requested_attributes\":{}," +
              "                                          \"requested_predicates\":{}\n" +
              "                                        }");

      for (int i = 1; i <= credIds.size(); i++) {
        requestedCredentialsJsonObj.getJSONObject("requested_attributes").put("attr" + i + "_referent", new JSONObject(String.format("{\"cred_id\":\"%s\", \"revealed\": true}", credIds.get(i - 1))));
      }
      for (int i = 1; i <= predIds.size(); i++) {
        requestedCredentialsJsonObj.getJSONObject("requested_predicates").put("predicate" + i + "_referent", new JSONObject(String.format("{\"cred_id\":\"%s\"}", predIds.get(i - 1))));
      }


      String schemas = new JSONObject(String.format("{\"%s\":%s}", HealthRecord.getSchemaDataId(), HealthRecord.getSchemaDataJSON())).toString();

      CredDefStorage.CredDef credDef = CredDefStorage.getStore().get(offerDid);
      String credentialDefs = new JSONObject(String.format("{\"%s\":%s}", credDef.credDefId, credDef.credDefJson)).toString();
      String revocStates = new JSONObject("{}").toString();


      String proofJson = Anoncreds.proverCreateProof(offerWallet, proofRequestJson.toString(), requestedCredentialsJsonObj.toString(),
              masterSecretId, schemas, credentialDefs, revocStates).get();
      JSONObject proof = new JSONObject(proofJson);

      response = proof.toString();


      URL url = new URL("http://" + responseDomain + "/proof_verify?prover_did=" + offerDid);
      URLConnection con = url.openConnection();
      HttpURLConnection http = (HttpURLConnection)con;
      http.setRequestMethod("POST"); // PUT is another valid option
      http.setDoOutput(true);
      byte[] out = proofJson.getBytes(StandardCharsets.UTF_8);
      int length = out.length;

      http.setFixedLengthStreamingMode(length);
      http.setRequestProperty("Content-Type", "application/json; charset=UTF-8");
      http.connect();
      try(OutputStream os = http.getOutputStream()) {
        os.write(out);
      }

      System.out.println("Prover created the proof of credentials");
    } catch (InterruptedException e) {
      e.printStackTrace();
    } catch (ExecutionException e) {
      e.printStackTrace();
    } catch (IndyException e) {
      e.printStackTrace();
    }


    httpExchange.sendResponseHeaders(responseCode, response.length());
    OutputStream os = httpExchange.getResponseBody();
    os.write(response.getBytes());
    os.close();
    return true;
  }
}
