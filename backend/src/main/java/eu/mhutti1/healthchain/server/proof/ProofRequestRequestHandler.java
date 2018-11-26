package eu.mhutti1.healthchain.server.proof;

import com.sun.net.httpserver.HttpExchange;
import eu.mhutti1.healthchain.constants.Constants;
import eu.mhutti1.healthchain.server.RequestUtils;
import eu.mhutti1.healthchain.server.events.NonEventConsumer;
import eu.mhutti1.healthchain.server.session.SessionManager;
import eu.mhutti1.healthchain.storage.ProofStorage;
import org.json.JSONArray;
import org.json.JSONObject;
import sun.net.www.http.HttpClient;

import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLConnection;
import java.nio.charset.StandardCharsets;
import java.util.Arrays;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;


/**
 * Created by root on 07/11/18.
 */
public class ProofRequestRequestHandler extends NonEventConsumer {

  public static JSONObject generateProofTemplate() {
    return new JSONObject("{" +
        "                    \"nonce\":\"123432421212\",\n" +
        "                    \"name\":\"proof_req_1\",\n" +
        "                    \"version\":\"0.1\", " +
        "                    \"requested_attributes\": {" +
        "                     }," +
        "                    \"requested_predicates\":{" +
        "                    }" +
        "                  }");
  }

  public String generateProofRequest(String[] attributeNames, String[] predicates) {
    JSONObject pr = generateProofTemplate();
    for (int i = 1; i <= attributeNames.length; i++) {
      pr.getJSONObject("requested_attributes").put("attr" + i + "_referent", new JSONObject("{\"name\":\"" + attributeNames[i - 1]+ "\"}"));
    }
    for (int i = 1; i <= predicates.length; i++) {
      pr.getJSONObject("requested_attributes").put("predicate" + i + "_referent", new JSONObject( predicates[i - 1]));
    }
    return pr.toString();
  }

  @Override
  public void handle(HttpExchange httpExchange) throws IOException {


    httpExchange.getResponseHeaders().add("Access-Control-Allow-Origin", "*");

    String query = httpExchange.getRequestURI().getQuery();
    Map<String, String> params = RequestUtils.queryToMap(query);

    String response = "session verified";
    int responseCode = RequestUtils.statusOK();

    String proverDid = params.get("prover_did");
    String agentDomain = params.get("agent_domain"); // localhost:8000

    JSONObject reqBody = new JSONObject(RequestUtils.getRequestBody(httpExchange));
    String reqAttrs = reqBody.getString("req_attrs");
    JSONArray reqPredicatesJSON = new JSONArray(reqBody.getString("req_predicates"));
    String[] reqPredicates = (String[]) reqPredicatesJSON
            .toList()
            .stream()
            .map(Object::toString)
            .collect(Collectors.toList())
            .toArray();

    URL url = new URL("http://" + agentDomain + "/proof_request_patient?prover_did=" + proverDid + "&response_domain=" + Constants.SERVER_DOMAIN);

    String proofJson = generateProofRequest(reqAttrs.split(","), reqPredicates);
    ProofStorage.getStore().put(proverDid, new ProofStorage.Proof(proofJson, Arrays.asList(reqAttrs.split(","))));

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



    httpExchange.sendResponseHeaders(responseCode, response.length());
    OutputStream os = httpExchange.getResponseBody();
    os.write(response.getBytes());
    os.close();
  }
}
