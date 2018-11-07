package eu.mhutti1.healthchain.server;

import com.sun.net.httpserver.HttpServer;
import eu.mhutti1.healthchain.constants.IndyPool;
import eu.mhutti1.healthchain.server.create.*;
import eu.mhutti1.healthchain.server.createOLD.DoctorCreateHandler;
import eu.mhutti1.healthchain.server.createOLD.PatientCreateHandler;
import eu.mhutti1.healthchain.server.events.EventConsumer;
import eu.mhutti1.healthchain.server.events.GetNotificationsHandler;
import eu.mhutti1.healthchain.server.events.NonEventConsumer;
import eu.mhutti1.healthchain.server.get.GetCredentialsHandler;
import eu.mhutti1.healthchain.server.issue.*;
import eu.mhutti1.healthchain.server.verify.DoctorVerifyHandler;
import eu.mhutti1.healthchain.server.verify.PatientVerifyHandler;
import eu.mhutti1.healthchain.server.verify.SessionVerifyHandler;
import eu.mhutti1.healthchain.storage.LocalStorage;
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
    LocalStorage.getStore();

    EventServer server = new EventServer();

    //old creation
//    server.createEndpoint("/patient_create", new PatientCreateHandler());
//    server.createEndpoint("/doctor_create", new DoctorCreateHandler());

    //creation
    server.createEndpoint("/create_patient_req", new CreateRequestPatientHandler());
    server.createEventEndpoint("/create_patient_approve", new CreateApprovePatientHandler());
    server.createEndpoint("/create_doctor_req", new CreateRequestDoctorHandler());
    server.createEventEndpoint("/create_doctor_approve", new CreateApproveDoctorHandler());

    //verification
    server.createEndpoint("/patient_verify", new PatientVerifyHandler());
    server.createEndpoint("/doctor_verify", new DoctorVerifyHandler());

    //valid session verifier
    server.createEndpoint("/verify_session", new SessionVerifyHandler());

    //master secret creation
    server.createEndpoint("/create_master_secret", new CreateMasterKeyHandler());

    //issue credential handshake
    server.createEventEndpoint("/credential_offer", new CredentialOfferHandler());
    server.createEventEndpoint("/credential_request", new CredentialRequestHandler());
    server.createEventEndpoint("/credential_issue", new CredentialIssueHandler());
    server.createEventEndpoint("/credential_store", new CredentialStoreHandler());

    //notifications
    server.createEndpoint("/get_events", new GetNotificationsHandler());

    //get credentials
    server.createEndpoint("/get_credentials", new GetCredentialsHandler());
    server.start();
  }
}
