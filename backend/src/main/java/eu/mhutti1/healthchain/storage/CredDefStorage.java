package eu.mhutti1.healthchain.storage;

import org.mapdb.DB;
import org.mapdb.DBMaker;
import org.mapdb.Serializer;

import java.io.Serializable;
import java.util.Map;

/**
 * Created by root on 07/11/18.
 */
public class CredDefStorage {

  public static class CredDefStore {
    private final DB instance;
    private final Map<String, CredDef> store;

    public CredDefStore(String database) {
      instance = DBMaker.fileDB(database).checksumHeaderBypass().make();
      store = instance.hashMap("store")
          .keySerializer(Serializer.STRING)
          .valueSerializer(Serializer.JAVA)
          .createOrOpen();
      if(store == null) {
        throw new RuntimeException("Store could not be instantiated");
      }
    }

    public Map<String, CredDef> getStore() {
      return store;
    }
  }

  public static class CredDef implements Serializable {
    public final String credDefId;
    public final String credDefJson;

    public CredDef(String credDefId, String credDefJson) {
      this.credDefId = credDefId;
      this.credDefJson = credDefJson;
    }
  }

  //  private static HTreeMap<String, EventQueue> store;
  private static CredDefStore store = new CredDefStore("credstorage.db");

  public static Map<String, CredDef> getStore() {
    return store.getStore();
  }
}
