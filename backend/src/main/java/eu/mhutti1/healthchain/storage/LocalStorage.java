package eu.mhutti1.healthchain.storage;

import org.mapdb.DB;
import org.mapdb.DBMaker;
import org.mapdb.HTreeMap;
import org.mapdb.Serializer;


import java.util.concurrent.ConcurrentMap;

public class LocalStorage {

  private static DB instance = null;
  private static HTreeMap<String, EventQueue> store;

  public static ConcurrentMap getStore() {
    if(instance == null) {
      instance = DBMaker.fileDB("storage.db").make();
      if(store == null) {
        store = instance.hashMap("store")
                .keySerializer(Serializer.STRING)
                .valueSerializer(Serializer.JAVA)
                .createOrOpen();
        if(store == null) {
          throw new RuntimeException("Store could not be instantiated");
        }
      }
    }
    return store;
  }

  public static void store(String key, EventNode node) {
    if(!store.containsKey(key)) {
      store.put(key, new EventQueue());
    }
    store.get(key).insertEvent(node);
    instance.commit();
  }

  public static void rollbackLastCommit() {
    instance.rollback();
  }

  public static EventQueue get(String key) {
    return store.get(key);
  }

  public static EventNode getEvent(String key, String id) {
    return store.get(key).getEvent(id);
  }

}
