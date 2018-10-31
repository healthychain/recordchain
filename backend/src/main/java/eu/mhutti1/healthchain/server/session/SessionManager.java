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

  public static long SESSION_DURATION_MINUTES = 2;

  private static final Map<String, SessionCredentials> sessions = new HashMap<>();

  public static void addSession(String walletId, String walletKey) throws InterruptedException, ExecutionException, IndyException {
    String token = Crypto.createToken();
    sessions.put(token, new SessionCredentials(walletId, walletKey));
  }

  public static boolean verifySession(String token) {
    if(sessions.containsKey(token)){
      return sessions.get(token).isValid();
    }
    return false;
  }

  public static long getSessionDuration() {
    return TimeUnit.MINUTES.toMillis(SESSION_DURATION_MINUTES);
  }

}
