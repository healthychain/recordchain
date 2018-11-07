package eu.mhutti1.healthchain.storage;

import eu.mhutti1.healthchain.server.events.EventConsumer;
import org.mapdb.*;


import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.ConcurrentMap;

public class EventStorage {

  public static class EventStore {
    private final DB instance;
    private final Map<String, EventQueue> store;

    public EventStore(String database) {
      instance = DBMaker.fileDB(database).checksumHeaderBypass().make();
      store = instance.hashMap("store")
          .keySerializer(Serializer.STRING)
          .valueSerializer(Serializer.JAVA)
          .createOrOpen();
      if(store == null) {
        throw new RuntimeException("Store could not be instantiated");
      }
    }

    public void commit() {
      instance.commit();
    }

    public Map<String, EventQueue> getStore() {
      return store;
    }
  }

//  private static HTreeMap<String, EventQueue> store;
  private static EventStore store = new EventStore("storage.db");

  public static Map<String, EventQueue> getStore() {
    return store.getStore();
  }

  public static void store(String key, EventNode node) {
    EventQueue eventQueue = new EventQueue();
    if(getStore().containsKey(key)) {
      eventQueue = getStore().get(key);
    }
    eventQueue.insertEvent(node);
    getStore().put(key, eventQueue);
    store.commit();
  }

  public static void remove(String key, String nodeId) {
    EventQueue eventQueue = new EventQueue();
    if(getStore().containsKey(key)) {
      eventQueue = getStore().get(key);
    }
    eventQueue.removeEvent(nodeId);
    getStore().put(key, eventQueue);
    store.commit();
  }

  public static EventQueue get(String key) {
    return getStore().get(key);
  }

  public static EventNode getEvent(String key, String id) {
    return getStore().get(key).getEvent(id);
  }

}
