package eu.mhutti1.healthchain.server;

import com.sun.net.httpserver.HttpServer;
import org.hyperledger.indy.sdk.pool.Pool;

import java.io.IOException;
import java.net.InetSocketAddress;

/**
 * Created by jedraz on 25/10/2018.
 */
public class Server {

  public Server(Pool pool) throws IOException {
    HttpServer server = HttpServer.create(new InetSocketAddress(8000), 0);
    server.createContext("/patient_create", new PatientCreateHandler(pool));
    server.createContext("/patient_verify", new PatientVerifyHandler(pool));
    server.createContext("/doctor_create", new DoctorCreateHandler(pool));
    server.createContext("/doctor_verify", new PatientVerifyHandler(pool));
    server.setExecutor(null); // creates a default executor
    server.start();
  }
}
