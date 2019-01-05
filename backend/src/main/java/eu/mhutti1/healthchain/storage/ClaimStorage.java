package eu.mhutti1.healthchain.storage;

import org.mapdb.DB;
import org.mapdb.DBMaker;
import org.mapdb.Serializer;

import java.io.Serializable;
import java.time.Instant;
import java.util.Map;

/**
 * Created by root on 07/11/18.
 */
public class ClaimStorage {

  public static class ClaimStoreDef {
    private final DB instance;
    private final Map<String, ClaimDef> store;

    public ClaimStoreDef(String database) {
      instance = DBMaker.fileDB(database).checksumHeaderBypass().make();
      store = instance.hashMap("store")
          .keySerializer(Serializer.STRING)
          .valueSerializer(Serializer.JAVA)
          .createOrOpen();
      if(store == null) {
        throw new RuntimeException("Store could not be instantiated");
      }
    }

    public Map<String, ClaimDef> getStore() {
      return store;
    }
  }

  public static class ClaimDef implements Serializable {
    public final Map<String, String> credentials;
    public final long timestamp;
    public final int counter;

    public ClaimDef(Map<String, String> credentials, int counter) {
      this.credentials = credentials;
      this.timestamp = Instant.now().getEpochSecond();
      this.counter = counter;
    }
  }

  //  private static HTreeMap<String, EventQueue> store;
  private static ClaimStoreDef store = new ClaimStoreDef("claimstorage.db");

  public static Map<String, ClaimDef> getStore() {
    return store.getStore();
  }
}
