package eu.mhutti1.healthchain.storage;


import org.apache.commons.lang3.RandomStringUtils;
import org.jetbrains.annotations.NotNull;
import org.json.JSONArray;
import org.json.JSONObject;
import org.mapdb.DataInput2;
import org.mapdb.DataOutput2;
import org.mapdb.Serializer;

import java.io.IOException;
import java.sql.Timestamp;

/**
 * Created by jedraz on 31/10/2018.
 */
public class EventNode implements Serializer{
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

  @Override
  public void serialize(@NotNull DataOutput2 out, @NotNull Object value) throws IOException {

  }

  @Override
  public Object deserialize(@NotNull DataInput2 input, int available) throws IOException {
    return null;
  }
}
