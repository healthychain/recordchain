package eu.mhutti1.healthchain.storage;

import org.jetbrains.annotations.NotNull;
import org.mapdb.DataInput2;
import org.mapdb.DataOutput2;
import org.mapdb.Serializer;

import java.io.IOException;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.NoSuchElementException;

/**
 * Created by jedraz on 31/10/2018.
 */
public class EventQueue implements Serializable {

  private final LinkedHashMap<String, EventNode> events;

  public EventQueue() {
    this.events = new LinkedHashMap<>();
  }

  public EventNode getEvent(String id) {
    if(events.containsKey(id)) {
      return events.get(id);
    }
    throw new NoSuchElementException();
  }

  public void insertEvent(EventNode node) {
    events.put(node.getId(), node);
  }

  public List<EventNode> getAllEvents() {
    if(events != null) {
      return new ArrayList<>(events.values());
    }
    else return new ArrayList<>();
  }

  public void removeEvent(String nodeId) {
    events.remove(nodeId);
  }
}
