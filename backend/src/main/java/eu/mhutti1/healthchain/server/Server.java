package eu.mhutti1.healthchain.server;

import com.sun.net.httpserver.HttpServer;
import eu.mhutti1.healthchain.constants.IndyPool;
import eu.mhutti1.healthchain.server.create.*;
import eu.mhutti1.healthchain.server.createOLD.DoctorCreateHandler;
import eu.mhutti1.healthchain.server.createOLD.PatientCreateHandler;
import eu.mhutti1.healthchain.server.events.EventConsumer;
import eu.mhutti1.healthchain.server.events.GetNotificationsHandler;
import eu.mhutti1.healthchain.server.events.NonEventConsumer;
import eu.mhutti1.healthchain.server.healthrecord.GetSchemaHandler;
import eu.mhutti1.healthchain.server.login.DoctorVerify;
import eu.mhutti1.healthchain.server.login.PatientVerify;
import eu.mhutti1.healthchain.server.credentials.GetCredentialsHandler;
import eu.mhutti1.healthchain.server.issue.*;
import eu.mhutti1.healthchain.server.logout.LogoutHandler;
import eu.mhutti1.healthchain.server.proof.ProofApproveHandler;
import eu.mhutti1.healthchain.server.proof.ProofRequestPatientHandler;
import eu.mhutti1.healthchain.server.proof.ProofRequestRequestHandler;
import eu.mhutti1.healthchain.server.proof.ProofVerifyHandler;
import eu.mhutti1.healthchain.server.verify.SessionVerifyHandler;
import eu.mhutti1.healthchain.storage.EventStorage;
import org.hyperledger.indy.sdk.IndyException;

import java.io.IOException;
import java.net.InetSocketAddress;
import java.util.concurrent.ExecutionException;

/**
 * Created by jedraz on 25/10/2018.
 */
public class Server {

  private class EventServer {
    HttpServer server;
    public EventServer() throws IOException {
      server = HttpServer.create(new InetSocketAddress(8000), 0);
      server.setExecutor(null);
    }

    public void createEndpoint(String endpoint, NonEventConsumer nonEventConsumer) {
      server.createContext(endpoint, nonEventConsumer);
    }

    public void createEventEndpoint(String endpoint, EventConsumer eventConsumer) {
      server.createContext(endpoint, eventConsumer);
    }

    public void start() {
      server.start();
    }
  }

  public Server() throws IOException, InterruptedException, ExecutionException, IndyException {

    IndyPool.initlaizePool();
    EventStorage.getStore();

    EventServer server = new EventServer();

    //old creation
    server.createEndpoint("/patient_create", new PatientCreateHandler());
    server.createEndpoint("/doctor_create", new DoctorCreateHandler());

    //creation
    server.createEndpoint("/create_patient_req", new CreateRequestPatientHandler());
    server.createEventEndpoint("/create_patient_approve", new CreateApprovePatientHandler());
    server.createEndpoint("/create_doctor_req", new CreateRequestDoctorHandler());
    server.createEventEndpoint("/create_doctor_approve", new CreateApproveDoctorHandler());

    //verification
    server.createEndpoint("/patient_verify", new PatientVerify());
    server.createEndpoint("/doctor_verify", new DoctorVerify());

    //logout
    server.createEndpoint("/logout", new LogoutHandler());

    //valid session verifier
    server.createEndpoint("/verify_session", new SessionVerifyHandler());

    //master secret creation
    server.createEndpoint("/create_master_secret", new CreateMasterKeyHandler());

    //issue credential handshake
    server.createEventEndpoint("/credential_offer", new CredentialOfferHandler());
    server.createEventEndpoint("/credential_request", new CredentialRequestHandler());
    server.createEventEndpoint("/credential_issue", new CredentialIssueHandler());
    server.createEventEndpoint("/credential_store", new CredentialStoreHandler());

    // Temp store read
    server.createEventEndpoint("/credential_cache_view", new CredentialCacheHandler());



    // proof handling
    server.createEndpoint("/proof_request_patient", new ProofRequestPatientHandler());
    server.createEventEndpoint("/proof_request_patient_approve", new ProofApproveHandler());


    // third party endpoint
    server.createEndpoint("/proof_request_request", new ProofRequestRequestHandler());
    server.createEndpoint("/proof_verify", new ProofVerifyHandler());

    //get public schema def
    server.createEndpoint("/get_public_schema", new GetSchemaHandler());

    //notifications
    server.createEndpoint("/get_events", new GetNotificationsHandler());

    //get credentials
    server.createEndpoint("/get_credentials", new GetCredentialsHandler());
    server.start();
  }
}
