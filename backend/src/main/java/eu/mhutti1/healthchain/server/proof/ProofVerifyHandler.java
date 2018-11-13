package eu.mhutti1.healthchain.server.proof;

import com.sun.net.httpserver.HttpExchange;
import eu.mhutti1.healthchain.constants.HealthRecord;
import eu.mhutti1.healthchain.server.RequestUtils;
import eu.mhutti1.healthchain.server.events.NonEventConsumer;
import eu.mhutti1.healthchain.storage.EventNode;
import eu.mhutti1.healthchain.storage.EventStorage;
import org.hyperledger.indy.sdk.IndyException;
import org.hyperledger.indy.sdk.anoncreds.Anoncreds;
import org.json.JSONObject;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.util.Map;
import java.util.concurrent.ExecutionException;
import java.util.stream.Collectors;

import static eu.mhutti1.healthchain.server.proof.ProofRequestRequestHandler.proofRequestJson;

/**
 * Created by root on 07/11/18.
 */
public class ProofVerifyHandler extends NonEventConsumer{
  @Override
  public void handle(HttpExchange httpExchange) throws IOException {


    httpExchange.getResponseHeaders().add("Access-Control-Allow-Origin", "*");

    String query = httpExchange.getRequestURI().getQuery();
    String proof = new BufferedReader(new InputStreamReader(httpExchange.getRequestBody())).lines().collect(Collectors.joining("\n"));


    String someGuyPerhapsAlex = (String) new JSONObject(proof).getJSONObject("requested_proof").getJSONObject("revealed_attrs").getJSONObject("attr1_referent").get("raw");

    assert "Alex".equals(someGuyPerhapsAlex);

    String chosenClaimsJson = "{\"requested_predicates\": {\"predicate1_referent\": {\"cred_id\": \"1\"}}, \"requested_attrs\": {\"attr1_referent\": [\"1\", true]}, \"self_attested_attributes\": {}}";
    String revocRegsJson = "{}";
    String response = "failure";


    System.out.println("11.Verifier is verifying proof from Prover");
    try {
      assert Anoncreds.verifierVerifyProof(proofRequestJson, proof, HealthRecord.getSchemaDataJSON(), chosenClaimsJson, revocRegsJson, null).get();
      response = "Success!!!!!";
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
