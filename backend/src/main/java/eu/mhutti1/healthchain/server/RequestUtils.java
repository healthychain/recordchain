package eu.mhutti1.healthchain.server;

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

}
