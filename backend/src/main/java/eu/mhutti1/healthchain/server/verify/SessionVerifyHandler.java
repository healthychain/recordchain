package eu.mhutti1.healthchain.server.verify;

import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpHandler;
import eu.mhutti1.healthchain.server.RequestUtils;
import eu.mhutti1.healthchain.server.events.NonEventConsumer;
import eu.mhutti1.healthchain.server.session.SessionInvalidException;
import eu.mhutti1.healthchain.server.session.SessionManager;
import org.hyperledger.indy.sdk.wallet.Wallet;

import java.io.IOException;
import java.io.OutputStream;
import java.util.Map;

/**
 * Created by jedraz on 06/11/2018.
 */
public class SessionVerifyHandler extends NonEventConsumer {

  @Override
  public void handle(HttpExchange httpExchange) throws IOException {

    httpExchange.getResponseHeaders().add("Access-Control-Allow-Origin", "*");

    String query = httpExchange.getRequestURI().getQuery();
    Map<String, String> params = RequestUtils.queryToMap(query);

    String token = params.get("token");

    String response = "session verified";
    int responseCode = RequestUtils.statusOK();

    boolean isSessionValid = SessionManager.isSessionValid(token);

    if(!isSessionValid) {
      response = "invalid session";
      responseCode = RequestUtils.statusSessionExpired();
    }

    httpExchange.sendResponseHeaders(responseCode, response.length());
    OutputStream os = httpExchange.getResponseBody();
    os.write(response.getBytes());
    os.close();
  }
}
