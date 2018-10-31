package eu.mhutti1.healthchain.storage;


import org.apache.commons.lang3.RandomStringUtils;
import org.json.JSONObject;

import java.sql.Timestamp;

/**
 * Created by jedraz on 31/10/2018.
 */
public class EventNode {
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
}
