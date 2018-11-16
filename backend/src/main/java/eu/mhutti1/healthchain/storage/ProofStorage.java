package eu.mhutti1.healthchain.storage;

import org.mapdb.DB;
import org.mapdb.DBMaker;
import org.mapdb.Serializer;

import java.io.Serializable;
import java.util.List;
import java.util.Map;

/**
 * Created by root on 07/11/18.
 */
public class ProofStorage {

  public static class ProofStore {
    private final DB instance;
    private final Map<String, Proof> store;

    public ProofStore(String database) {
      instance = DBMaker.fileDB(database).checksumHeaderBypass().make();
      store = instance.hashMap("store")
          .keySerializer(Serializer.STRING)
          .valueSerializer(Serializer.JAVA)
          .createOrOpen();
      if(store == null) {
        throw new RuntimeException("Store could not be instantiated");
      }
    }

    public Map<String, Proof> getStore() {
      return store;
    }
  }

  public static class Proof implements Serializable {
    public final String proofJson;
    public final Map<String, String> creds;
    public List<String> order;

    public Proof(String proofJson, List<String> order) {
      this.proofJson = proofJson;
      this.creds = null;
      this.order = order;
    }

    public Proof(String proofJson, Map<String, String> creds) {
      this.proofJson = proofJson;
      this.creds = creds;
    }
  }

  //  private static HTreeMap<String, EventQueue> store;
  private static ProofStore store = new ProofStore("proofstorage.db");

  public static Map<String, Proof> getStore() {
    return store.getStore();
  }
}
