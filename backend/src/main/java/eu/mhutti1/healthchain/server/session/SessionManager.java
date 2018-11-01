package eu.mhutti1.healthchain.server.session;

import eu.mhutti1.healthchain.utils.Crypto;
import org.hyperledger.indy.sdk.IndyException;

import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.TimeUnit;

/**
 * Created by jedraz on 31/10/2018.
 */
public class SessionManager {

  public static long SESSION_DURATION_MINUTES = 15;

  private static final Map<String, SessionCredentials> sessions = new HashMap<>();

  public static String addSession(String did, String walletId, String walletKey) throws InterruptedException, ExecutionException, IndyException {
    String token = Crypto.createToken();
    sessions.put(token, new SessionCredentials(did, walletId, walletKey));
    return token;
  }

  public static SessionCredentials getSessionCredentials(String token) throws SessionInvalidException {
    if(isSessionValid(token)){
      System.out.println("Get session credentials for token: " + token + "\n");
      return sessions.get(token);
    }
    else throw new SessionInvalidException();
  }

  public static boolean isSessionValid(String token) {
    if(sessions.containsKey(token)){
      return sessions.get(token).isValid();
    }
    return false;
  }

  public static long getSessionDuration() {
    return TimeUnit.MINUTES.toMillis(SESSION_DURATION_MINUTES);
  }

}
