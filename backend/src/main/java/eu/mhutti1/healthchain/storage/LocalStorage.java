package eu.mhutti1.healthchain.storage;

import org.mapdb.DB;
import org.mapdb.DBMaker;
import org.mapdb.QueueLong;

import java.util.concurrent.ConcurrentMap;

public class LocalStorage {

  private static DB instance = null;
  private static ConcurrentMap<String, String> store;

  public static ConcurrentMap getStore() {
    if(instance == null) {
      instance = DBMaker.fileDB("storage.db").make();
      if(store == null) {
        store = instance.hashMap("store", QueueLong.Node.SERIALIZER.STRING, QueueLong.Node.SERIALIZER.STRING).createOrOpen();
      }
    }
    return store;
  }

  public static void store(String key, String value) {
    store.put(key, value);
    instance.commit();
  }

  public static void rollbackLastCommit() {
    instance.rollback();
  }

  public static void get(String key) {
    store.get(key);
  }

}
