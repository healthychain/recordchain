package eu.mhutti1.healthchain.storage;


import org.apache.commons.lang3.RandomStringUtils;
import org.jetbrains.annotations.NotNull;
import org.json.JSONArray;
import org.json.JSONObject;
import org.mapdb.DataInput2;
import org.mapdb.DataOutput2;
import org.mapdb.Serializer;

import java.io.IOException;
import java.io.ObjectInputStream;
import java.io.ObjectOutputStream;
import java.io.Serializable;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;

/**
 * Created by jedraz on 31/10/2018.
 */
public class EventNode implements Serializable {
  private String id;
  private String type;
  private String fromDid;
  private Timestamp created;
  private JSONObject payload;
  private String acceptAction;
  private String dismissAction;

  public EventNode(String type, String fromDid, JSONObject payload, String acceptEndpoint, String dismissEndpoint) {
    this.id = RandomStringUtils.randomAlphanumeric(16);
    this.type = type;
    this.fromDid = fromDid;
    this.created = new Timestamp(System.currentTimeMillis());
    this.payload = payload;
    this.acceptAction = acceptEndpoint != null ? createAction(acceptEndpoint, id) : "";
    this.dismissAction = dismissEndpoint != null ? createAction(dismissEndpoint, id) : "";
  }

  private String createAction(String endpoint, String id) {
    return String.format("%s?event_id=%s&", endpoint, id);
  }

  public String getId() {
    return id;
  }

  public String getType() {
    return type;
  }

  public String getFromDid() {
    return fromDid;
  }

  public Timestamp getCreated() {
    return created;
  }

  public JSONObject getPayload() {
    return payload;
  }

  public JSONObject toJSON() {
    return new JSONObject()
            .put("id", id)
            .put("type", type)
            .put("acceptAction", acceptAction)
            .put("dismissAction", dismissAction);
  }

  @Override
  public boolean equals(Object object) {
    if (object instanceof EventNode) {
      return ((EventNode) object).id.equals(this.id);
    }
    return false;
  }

  @Override
  public int hashCode() {
    return id.hashCode();
  }

  private void writeObject(ObjectOutputStream oos)
      throws IOException {
    // write the object
    oos.writeObject(id);
    oos.writeObject(type);
    oos.writeObject(fromDid);
    oos.writeObject(created);
    oos.writeObject(payload.toString());
    oos.writeObject(acceptAction);
    oos.writeObject(dismissAction);
  }

  private void readObject(ObjectInputStream ois)
      throws ClassNotFoundException, IOException {

    id = (String) ois.readObject();
    type = (String) ois.readObject();
    fromDid = (String) ois.readObject();
    created = (Timestamp) ois.readObject();
    payload = new JSONObject((String) ois.readObject());
    acceptAction = (String) ois.readObject();
    dismissAction = (String) ois.readObject();
  }
}
