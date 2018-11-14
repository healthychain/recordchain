package eu.mhutti1.healthchain.server;

import com.sun.net.httpserver.HttpExchange;
import org.json.JSONObject;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.UnsupportedEncodingException;
import java.util.HashMap;
import java.util.Map;

/**
 * Created by jedraz on 25/10/2018.
 */
public class RequestUtils {

  public static  Map<String, String> queryToMap(String query) {
    Map<String, String> result = new HashMap<>();
    for (String param : query.split("&")) {
      String[] entry = param.split("=");
      if (entry.length > 1) {
        result.put(entry[0], entry[1]);
      }else{
        result.put(entry[0], "");
      }
    }
    return result;
  }

  public static String getRequestBody(HttpExchange httpExchange ) throws IOException {

    InputStreamReader isr =  new InputStreamReader(httpExchange.getRequestBody(),"utf-8");
    BufferedReader br = new BufferedReader(isr);
    int b;
    StringBuilder buf = new StringBuilder(512);
    while ((b = br.read()) != -1) {
      buf.append((char) b);
    }
    br.close();
    isr.close();

    return buf.toString();

  }

  public static String wrapResponse(String key, String payload) {
    return new JSONObject().put(key, payload).toString();
  }

  public static String messageOK(){
    return "OK";
  }

  public static int statusOK() {
    return 200;
  }

  public static String messageInternalServerError() {
    return "Internal Server Error";
  }

  public static int statuSInternalServerError() {
    return 500;
  }

  public static String messageUnauthorized() {
    return "Unauthorized request";
  }

  public static int statusUnauthorized() {
    return 400;
  }

  public static int statusSessionExpired() {
    return 401;
  }

}
