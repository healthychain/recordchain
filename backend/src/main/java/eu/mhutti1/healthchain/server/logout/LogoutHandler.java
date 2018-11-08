package eu.mhutti1.healthchain.server.logout;

import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpHandler;
import eu.mhutti1.healthchain.server.RequestUtils;
import eu.mhutti1.healthchain.server.events.NonEventConsumer;
import eu.mhutti1.healthchain.server.session.SessionInvalidException;
import eu.mhutti1.healthchain.server.session.SessionManager;
import org.hyperledger.indy.sdk.IndyException;
import org.hyperledger.indy.sdk.wallet.Wallet;

import java.io.IOException;
import java.io.OutputStream;
import java.util.Map;

/**
 * Created by jedraz on 08/11/2018.
 */
public class LogoutHandler extends NonEventConsumer {
  @Override
  public void handle(HttpExchange httpExchange) throws IOException {
    httpExchange.getResponseHeaders().add("Access-Control-Allow-Origin", "*");

    String query = httpExchange.getRequestURI().getQuery();
    Map<String, String> params = RequestUtils.queryToMap(query);

    String token = params.get("token");

    String response = null;
    int responseCode = 200;

    Wallet proverWallet = null;

    try {
      proverWallet = SessionManager.getSessionCredentials(token).getWallet();
    } catch (SessionInvalidException e) {
      e.printStackTrace();
      response = "Invalid token";
    }

    if (proverWallet != null) {
      try {
        proverWallet.closeWallet();
      } catch (IndyException e) {
        e.printStackTrace();
      }
    }

    SessionManager.deleteSession(token);

    response = "{\"response\":" + response + "}";

    httpExchange.sendResponseHeaders(responseCode, response.length());
    OutputStream os = httpExchange.getResponseBody();
    os.write(response.getBytes());
    os.close();

  }
}
