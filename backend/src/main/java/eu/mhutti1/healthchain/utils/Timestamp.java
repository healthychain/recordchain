package eu.mhutti1.healthchain.utils;

import java.text.SimpleDateFormat;
import java.util.Date;

/**
 * Created by jedraz on 06/01/2019.
 */
public class Timestamp {
  public static String getCurrentTimeStamp() {
    return new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").format(new Date());
  }

}
