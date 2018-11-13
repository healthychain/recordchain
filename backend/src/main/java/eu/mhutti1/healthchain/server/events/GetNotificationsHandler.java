package eu.mhutti1.healthchain.server.events;

import com.sun.net.httpserver.HttpExchange;
import eu.mhutti1.healthchain.server.RequestUtils;
import eu.mhutti1.healthchain.server.session.SessionInvalidException;
import eu.mhutti1.healthchain.server.session.SessionManager;
import eu.mhutti1.healthchain.storage.EventNode;
import eu.mhutti1.healthchain.storage.EventQueue;
import eu.mhutti1.healthchain.storage.EventStorage;
import org.json.JSONArray;

import java.io.IOException;
import java.io.OutputStream;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

/**
 * Created by jedraz on 31/10/2018.
 */
public class GetNotificationsHandler extends NonEventConsumer {


  @Override
  public void handle(HttpExchange httpExchange) throws IOException {

    httpExchange.getResponseHeaders().add("Access-Control-Allow-Origin", "*");

    String query = httpExchange.getRequestURI().getQuery();
    Map<String, String> params = RequestUtils.queryToMap(query);

    String token = params.get("token");

    String response = new JSONArray().toString();
    int responseCode = 200;

    String did = null;

    try {
      did = SessionManager.getSessionCredentials(token).getDid();
    } catch (SessionInvalidException e) {
      e.printStackTrace();
      response = "Invalid token";
      responseCode = RequestUtils.statusSessionExpired();
    }

    if(did != null) {
      responseCode = RequestUtils.statusOK();
      EventQueue eventQueue = EventStorage.get(did);
      if (eventQueue == null) {
        response = new JSONArray().toString();
      } else {
        List<EventNode> events = eventQueue.getAllEvents();
        response = new JSONArray(events.stream().map(event -> event.toJSON()).collect(Collectors.toList())).toString();
      }
    }

    response = RequestUtils.wrapResponse("events", response);

    httpExchange.sendResponseHeaders(responseCode, response.length());
    OutputStream os = httpExchange.getResponseBody();
    os.write(response.getBytes());
    os.close();
    return;

  }
}
