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
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
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
  private boolean requireMasterSecret;
  private String createdAt;

  public EventNode(String type, String fromDid, JSONObject payload, String acceptEndpoint, String dismissEndpoint, boolean requireMasterSecret) {
    this.id = RandomStringUtils.randomAlphanumeric(16);
    this.type = type;
    this.fromDid = fromDid;
    this.created = new Timestamp(System.currentTimeMillis());
    this.payload = payload;
    this.acceptAction = acceptEndpoint != null ? createAction(acceptEndpoint, id) : "";
    this.dismissAction = dismissEndpoint != null ? createAction(dismissEndpoint, id) : "";
    this.requireMasterSecret = requireMasterSecret;
    this.createdAt = getCurrentTimeStamp();
  }

  public EventNode(String type, String fromDid, JSONObject payload, String acceptEndpoint, String dismissEndpoint) {
    this(type, fromDid, payload, acceptEndpoint, dismissEndpoint, false);
  }

  private String getCurrentTimeStamp() {
    return new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").format(new Date());
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
            .put("dismissAction", dismissAction)
            .put("requireMasterSecret", requireMasterSecret)
            .put("fromDid", fromDid)
            .put("createdAt", createdAt);
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
    oos.writeObject(requireMasterSecret);
    oos.writeObject(createdAt);
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
    requireMasterSecret = (Boolean) ois.readObject();
    createdAt = (String) ois.readObject();
  }
}
