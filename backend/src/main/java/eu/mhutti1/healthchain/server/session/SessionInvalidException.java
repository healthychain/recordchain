package eu.mhutti1.healthchain.server.session;

/**
 * Created by jedraz on 31/10/2018.
 */
public class SessionInvalidException extends Exception {
  public SessionInvalidException() {
    super("Invalid session exception");
  }
}
