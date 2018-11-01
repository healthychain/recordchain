package eu.mhutti1.healthchain.storage;

import org.mapdb.*;


import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.ConcurrentMap;

public class LocalStorage {

  private static DB instance = null;
//  private static HTreeMap<String, EventQueue> store;
  private static Map<String, EventQueue> store;

  public static void getStore() {
    if(instance == null) {
      instance = DBMaker.fileDB("storage.db").checksumHeaderBypass().make();
      if(store == null) {
//        store = instance.hashMap("store")
//                .keySerializer(Serializer.STRING)
//                .valueSerializer(Serializer.JAVA)
//                .createOrOpen();
        store = new HashMap<>();
        if(store == null) {
          throw new RuntimeException("Store could not be instantiated");
        }
      }
    }
  }

  public static void store(String key, EventNode node) {
    EventQueue eventQueue = new EventQueue();
    if(store.containsKey(key)) {
      eventQueue = store.get(key);
    }
    eventQueue.insertEvent(node);
    store.put(key, eventQueue);
//    instance.commit();
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
