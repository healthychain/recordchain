package eu.mhutti1.healthchain.server.verify;

import org.hyperledger.indy.sdk.pool.Pool;


/**
 * Created by jedraz on 25/10/2018.
 */
public class PatientVerifyHandler extends VerifyHandler {

  public PatientVerifyHandler(Pool pool) {
    super(pool);
  }
}