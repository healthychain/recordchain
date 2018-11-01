package eu.mhutti1.healthchain.server;

import com.sun.net.httpserver.HttpServer;
import eu.mhutti1.healthchain.constants.IndyPool;
import eu.mhutti1.healthchain.server.create.*;
import eu.mhutti1.healthchain.server.events.GetNotificationsHandler;
import eu.mhutti1.healthchain.server.issue.CreateMasterKeyHandler;
import eu.mhutti1.healthchain.server.issue.CredentialOfferHandler;
import eu.mhutti1.healthchain.server.issue.CredentialRequestHandler;
import eu.mhutti1.healthchain.server.verify.DoctorVerifyHandler;
import eu.mhutti1.healthchain.server.verify.PatientVerifyHandler;
import eu.mhutti1.healthchain.storage.LocalStorage;
import org.hyperledger.indy.sdk.IndyException;

import java.io.IOException;
import java.net.InetSocketAddress;
import java.util.concurrent.ExecutionException;

/**
 * Created by jedraz on 25/10/2018.
 */
public class Server {

  public Server() throws IOException, InterruptedException, ExecutionException, IndyException {

    IndyPool.initlaizePool();
    LocalStorage.getStore();

    HttpServer server = HttpServer.create(new InetSocketAddress(8000), 0);
    //old creation
    server.createContext("/patient_create", new PatientCreateHandler());
    server.createContext("/doctor_create", new DoctorCreateHandler());

    //new creation
    server.createContext("/create_user_req", new CreateRequestHandler());
    server.createContext("/create_patient_approve", new CreateApprovePatientHandler());

    //verification
    server.createContext("/patient_verify", new PatientVerifyHandler());
    server.createContext("/doctor_verify", new DoctorVerifyHandler());

    server.createContext("/create_master_secret", new CreateMasterKeyHandler());
    server.createContext("/credential_offer", new CredentialOfferHandler());
    server.createContext("/credential_request", new CredentialRequestHandler());
    server.createContext("/get_events", new GetNotificationsHandler());
    server.setExecutor(null); // creates a default executor
    server.start();
  }
}
