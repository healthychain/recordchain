package eu.mhutti1.healthchain;

import java.util.concurrent.ExecutionException;
import org.hyperledger.indy.sdk.IndyException;

public interface CredentialIssuer {

  void issueCredential() throws IndyException, ExecutionException, InterruptedException;

}
