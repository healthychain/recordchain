package eu.mhutti1.healthchain.server.proof;

import com.sun.net.httpserver.HttpExchange;
import eu.mhutti1.healthchain.server.RequestUtils;
import eu.mhutti1.healthchain.server.events.NonEventConsumer;
import eu.mhutti1.healthchain.storage.ClaimStorage;
import eu.mhutti1.healthchain.storage.CredRequestStorage;
import eu.mhutti1.healthchain.storage.ProofStorage;
import org.json.JSONObject;

import java.io.IOException;
import java.io.OutputStream;
import java.util.List;
import java.util.Map;

/**
 * Created by jedraz on 06/01/2019.
 */
public class ProofRequestStatusHandler extends NonEventConsumer {

  @Override
  public void handle(HttpExchange httpExchange) throws IOException {

    httpExchange.getResponseHeaders().add("Access-Control-Allow-Origin", "*");

    String query = httpExchange.getRequestURI().getQuery();
    Map<String, String> params = RequestUtils.queryToMap(query);

    String requesterDid = params.get("requester_did");
    String response = "";

    if (!CredRequestStorage.getStore().containsKey(requesterDid)) {
      response = "{}";
    }
    else {
      List<String> requests = CredRequestStorage.getStore().get(requesterDid).proverDids;
      JSONObject responseJ = new JSONObject();

      requests.stream().forEach(request -> {
        boolean requestStatus = ProofStorage.getStore().containsKey(request) && ProofStorage.getStore().get(request).creds != null;
        responseJ.put(request, requestStatus);
      });

      response = responseJ.toString();
    }

    int responseCode = 200;

    httpExchange.sendResponseHeaders(responseCode, response.length());
    OutputStream os = httpExchange.getResponseBody();
    os.write(response.getBytes());
    os.close();
  }
}
