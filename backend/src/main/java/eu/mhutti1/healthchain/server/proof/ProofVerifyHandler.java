package eu.mhutti1.healthchain.server.proof;

import com.sun.net.httpserver.HttpExchange;
import eu.mhutti1.healthchain.constants.HealthRecord;
import eu.mhutti1.healthchain.server.RequestUtils;
import eu.mhutti1.healthchain.server.events.NonEventConsumer;
import eu.mhutti1.healthchain.server.issue.CredentialOfferHandler;
import eu.mhutti1.healthchain.storage.CredDefStorage;
import eu.mhutti1.healthchain.storage.EventNode;
import eu.mhutti1.healthchain.storage.EventStorage;
import eu.mhutti1.healthchain.storage.ProofStorage;
import org.hyperledger.indy.sdk.IndyException;
import org.hyperledger.indy.sdk.anoncreds.Anoncreds;
import org.hyperledger.indy.sdk.anoncreds.AnoncredsResults;
import org.json.JSONObject;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ExecutionException;
import java.util.stream.Collectors;


/**
 * Created by root on 07/11/18.
 */
public class ProofVerifyHandler extends NonEventConsumer{
  @Override
  public void handle(HttpExchange httpExchange) throws IOException {


    httpExchange.getResponseHeaders().add("Access-Control-Allow-Origin", "*");

    String query = httpExchange.getRequestURI().getQuery();

    Map<String, String> params = RequestUtils.queryToMap(query);
    String proverDid = params.get("prover_did");

    String proof = new BufferedReader(new InputStreamReader(httpExchange.getRequestBody())).lines().collect(Collectors.joining("\n"));

    List<String> values = new ArrayList<>();
    for (int i = 1; new JSONObject(proof).getJSONObject("requested_proof").getJSONObject("revealed_attrs").has("attr" + i + "_referent"); i++) {
      values.add((String) new JSONObject(proof).getJSONObject("requested_proof").getJSONObject("revealed_attrs").getJSONObject("attr" + i + "_referent").get("raw"));
      System.out.println("Alex: " + values.get(i - 1));
    }

    String proofJSON = ProofStorage.getStore().get(proverDid).proofJson;

    ProofStorage.Proof p = ProofStorage.getStore().get(proverDid);
    Map<String, String> result = new HashMap<>();
    int i = 0;
    for (String string : p.order) {
      result.put(string, values.get(i++));
    }
    ProofStorage.getStore().put(proverDid, new ProofStorage.Proof(proverDid, result));


    String chosenClaimsJson = "{\"requested_predicates\": {\"predicate1_referent\": {\"cred_id\": \"1\"}}, \"requested_attrs\": {\"attr1_referent\": [\"1\", true]}, \"self_attested_attributes\": {}}";
    String revocRegsJson = "{}";
    String response = "failure";


    String schemas = new JSONObject(String.format("{\"%s\":%s}", HealthRecord.getSchemaDataId(), HealthRecord.getSchemaDataJSON())).toString();
    CredDefStorage.CredDef credDef = CredDefStorage.getStore().get(proverDid);
    String credentialDefs = new JSONObject(String.format("{\"%s\":%s}", credDef.credDefId, credDef.credDefJson)).toString();

    System.out.println("11.Verifier is verifying proof from Prover");
    try {
      boolean valid = Anoncreds.verifierVerifyProof(proofJSON, proof, schemas, credentialDefs, revocRegsJson, "{}").get();
      if(!valid) {
        response = "Failure";
      }
    } catch (InterruptedException e) {
      e.printStackTrace();
    } catch (ExecutionException e) {
      e.printStackTrace();
    } catch (IndyException e) {
      e.printStackTrace();
    }

    int responseCode = RequestUtils.statusOK();

    System.out.println(response);

    httpExchange.sendResponseHeaders(responseCode, response.length());
    OutputStream os = httpExchange.getResponseBody();
    os.write(response.getBytes());
    os.close();

  }
}
