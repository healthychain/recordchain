package eu.mhutti1.healthchain.MainTest.storage;

import eu.mhutti1.healthchain.storage.EventNode;
import org.apache.commons.lang3.SerializationUtils;
import org.json.JSONObject;
import org.junit.Test;

import java.io.*;
import java.sql.Timestamp;

import static org.junit.Assert.assertEquals;

/**
 * Created by jedraz on 11/11/2018.
 */
public class EventNodeTest {

  @Test
  public void canSerializeAndDeserializeItself() throws IOException {
    String type = "test_type";
    String fromDid = "test_did";
    JSONObject payload = new JSONObject();
    String acceptEndpoint = "test_accept";
    String dismissEndpoint = "test_dismiss";
    EventNode eventNode = new EventNode(type, fromDid, payload, acceptEndpoint, dismissEndpoint);

    Serializable copy = SerializationUtils.clone(eventNode);
    assertEquals(eventNode, copy);
  }
}
