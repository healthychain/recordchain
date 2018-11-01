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

  public EventNode(String type, String fromDid, JSONObject payload) {
    this.id = RandomStringUtils.randomAlphanumeric(16);
    this.type = type;
    this.fromDid = fromDid;
    this.created = new Timestamp(System.currentTimeMillis());
    this.payload = payload;
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
            .put("fromDid", fromDid)
            .put("payload", payload);
  }


  private void writeObject(ObjectOutputStream oos)
      throws IOException {
    // write the object
    oos.writeObject(id);
    oos.writeObject(type);
    oos.writeObject(fromDid);
    oos.writeObject(created);
    oos.writeObject(payload.toString());
  }

  private void readObject(ObjectInputStream ois)
      throws ClassNotFoundException, IOException {

    id = (String) ois.readObject();
    type = (String) ois.readObject();
    fromDid = (String) ois.readObject();
    created = (Timestamp) ois.readObject();
    payload = new JSONObject((String) ois.readObject());
  }
}
