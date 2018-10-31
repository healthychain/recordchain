package eu.mhutti1.healthchain.storage;

import java.util.LinkedHashMap;
import java.util.List;
import java.util.NoSuchElementException;

/**
 * Created by jedraz on 31/10/2018.
 */
public class EventQueue {

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
    return (List<EventNode>) events.values();
  }

}
