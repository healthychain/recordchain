package eu.mhutti1.healthchain.storage;

import eu.mhutti1.healthchain.utils.Timestamp;
import org.mapdb.DB;
import org.mapdb.DBMaker;
import org.mapdb.Serializer;

import java.io.Serializable;
import java.time.Instant;
import java.util.List;
import java.util.Map;

/**
 * Created by jedraz on 06/01/2019.
 */
public class CredRequestStorage {

  public static class CredRequestStoreDef {
    private final DB instance;
    private final Map<String, CredRequestStorage.CredRequestDef> store;

    public CredRequestStoreDef(String database) {
      instance = DBMaker.fileDB(database).checksumHeaderBypass().make();
      store = instance.hashMap("store")
              .keySerializer(Serializer.STRING)
              .valueSerializer(Serializer.JAVA)
              .createOrOpen();
      if(store == null) {
        throw new RuntimeException("Store could not be instantiated");
      }
    }

    public Map<String, CredRequestStorage.CredRequestDef> getStore() {
      return store;
    }
  }

  public static class CredRequestDef implements Serializable {

    public final List<String> proverDids;

    public CredRequestDef(List<String> proverDids) {
      this.proverDids = proverDids;
    }
  }

  //  private static HTreeMap<String, EventQueue> store;
  private static CredRequestStorage.CredRequestStoreDef store = new CredRequestStorage.CredRequestStoreDef("credrequeststore.db");

  public static Map<String, CredRequestStorage.CredRequestDef> getStore() {
    return store.getStore();
  }
}
