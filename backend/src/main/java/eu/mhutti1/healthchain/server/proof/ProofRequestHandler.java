package eu.mhutti1.healthchain.server.proof;

import com.sun.net.httpserver.HttpExchange;
import eu.mhutti1.healthchain.server.RequestUtils;
import eu.mhutti1.healthchain.server.events.NonEventConsumer;
import eu.mhutti1.healthchain.storage.CredRequestStorage;
import eu.mhutti1.healthchain.storage.EventNode;
import eu.mhutti1.healthchain.storage.EventStorage;
import org.hyperledger.indy.sdk.wallet.Wallet;
import org.json.JSONObject;

import java.io.*;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

/**
 * Created by jedraz on 01/11/2018.
 */
public abstract class ProofRequestHandler extends NonEventConsumer {
  @Override
  public void handle(HttpExchange httpExchange) throws IOException {

    httpExchange.getResponseHeaders().add("Access-Control-Allow-Origin", "*");

    String query = httpExchange.getRequestURI().getQuery();
    String data = new BufferedReader(new InputStreamReader(httpExchange.getRequestBody())).lines().collect(Collectors.joining("\n"));
    Map<String, String> params = RequestUtils.queryToMap(query);

    String proverDid = params.get("prover_did");
    String responseDomain = params.get("response_domain");
    JSONObject payload = new JSONObject(data);
    payload.put("response_domain", responseDomain);

    int responseCode = RequestUtils.statusOK();
    String response = "OK";


    EventStorage.store(proverDid, new EventNode("Third party wants to access your health data", "", payload, getApproveEndpoint(), getDismissEndpoint(), true));

    if(!CredRequestStorage.getStore().containsKey("third-party")){
      CredRequestStorage.getStore().put("third-party", new CredRequestStorage.CredRequestDef(new ArrayList<String>()));
    }

    List<String> newOne = CredRequestStorage.getStore().get("third-party").proverDids;
    newOne.add(proverDid);
    CredRequestStorage.getStore().put("third-party", new CredRequestStorage.CredRequestDef(newOne));


    httpExchange.sendResponseHeaders(responseCode, response.length());
    OutputStream os = httpExchange.getResponseBody();
    os.write(response.getBytes());
    os.close();

    return;
  }

  public String getDismissEndpoint() {
    return "dismiss_notification";
  }
  protected abstract String getApproveEndpoint();

}
