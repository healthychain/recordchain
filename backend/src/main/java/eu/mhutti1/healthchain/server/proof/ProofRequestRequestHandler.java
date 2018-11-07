package eu.mhutti1.healthchain.server.proof;

import com.sun.net.httpserver.HttpExchange;
import eu.mhutti1.healthchain.server.RequestUtils;
import eu.mhutti1.healthchain.server.events.NonEventConsumer;
import eu.mhutti1.healthchain.server.session.SessionManager;
import org.json.JSONObject;
import sun.net.www.http.HttpClient;

import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLConnection;
import java.nio.charset.StandardCharsets;
import java.util.Map;

/**
 * Created by root on 07/11/18.
 */
public class ProofRequestRequestHandler extends NonEventConsumer {

  public static String proofRequestJson = new JSONObject("{" +
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

  @Override
  public void handle(HttpExchange httpExchange) throws IOException {


    httpExchange.getResponseHeaders().add("Access-Control-Allow-Origin", "*");

    String query = httpExchange.getRequestURI().getQuery();
    Map<String, String> params = RequestUtils.queryToMap(query);

    String response = "session verified";
    int responseCode = RequestUtils.statusOK();





    URL url = new URL("http://localhost:8000/proof_request_patient?" + query);
    URLConnection con = url.openConnection();
    HttpURLConnection http = (HttpURLConnection)con;
    http.setRequestMethod("POST"); // PUT is another valid option
    http.setDoOutput(true);
    byte[] out = proofRequestJson.getBytes(StandardCharsets.UTF_8);
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
