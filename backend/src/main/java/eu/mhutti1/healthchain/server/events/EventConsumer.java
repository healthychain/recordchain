package eu.mhutti1.healthchain.server.events;

import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpHandler;
import eu.mhutti1.healthchain.server.RequestUtils;
import eu.mhutti1.healthchain.server.session.SessionInvalidException;
import eu.mhutti1.healthchain.server.session.SessionManager;
import eu.mhutti1.healthchain.storage.EventStorage;
import org.hyperledger.indy.sdk.IndyException;
import org.hyperledger.indy.sdk.wallet.Wallet;

import java.io.IOException;
import java.io.OutputStream;
import java.util.Map;

/**
 * Created by root on 07/11/18.
 */
public abstract class EventConsumer implements HttpHandler {


  @Override
  public void handle(HttpExchange httpExchange) throws IOException {
    String query = httpExchange.getRequestURI().getQuery();
    Map<String, String> params = RequestUtils.queryToMap(query);
    String eventId = params.get("event_id");
    String token = params.get("token");

    Wallet proverWallet = null;
    String proverDid = null;

    try {
      proverWallet = SessionManager.getSessionCredentials(token).getWallet();
      proverDid = SessionManager.getSessionCredentials(token).getDid();
    } catch (SessionInvalidException e) {
      String response = "Invalid session token";
      httpExchange.sendResponseHeaders(RequestUtils.statusSessionExpired(), response.length());
      OutputStream os = httpExchange.getResponseBody();
      os.write(response.getBytes());
      os.close();
      return;
    } catch (IndyException e) {
      e.printStackTrace();
    }

    if (handleEventAction(httpExchange)) {
      EventStorage.remove(proverDid, eventId);
    }
  }

  public abstract boolean handleEventAction(HttpExchange httpExchange) throws IOException;

}
