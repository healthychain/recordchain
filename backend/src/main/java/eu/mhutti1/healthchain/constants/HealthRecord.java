package eu.mhutti1.healthchain.constants;

import org.json.JSONObject;

import static org.hyperledger.indy.sdk.ledger.Ledger.buildSchemaRequest;

/**
 * Created by jedraz on 24/10/2018.
 */
public class HealthRecord {

  private static String schemaDataJSON;

  public static String getSchemaDataJSON() {
    if(schemaDataJSON == null) {
      schemaDataJSON = createSchemaDataJSON();
      System.out.println("Schema: " + schemaDataJSON);
    }
    return schemaDataJSON;
  }

  private static String createSchemaDataJSON() {
    System.out.println("\nBuild the SCHEMA request to add new schema to the ledger as a Steward\n");
    String name = "health_record";
    String version = "1.0";
    String attributes = "[\"age\", \"sex\", \"height\", \"name\"]";
    String id = "1";
    return new JSONObject("{\"name\":\"" + name + "\",\"version\":\"" + version + "\",\"attrNames\":" + attributes + ",\"ver\":\"" + version + "\",\"id\":\"" + id + "\"}").toString();
  }

  public static String getCustomSchemaDataJSON(String data) {
    if(schemaDataJSON == null) {
      schemaDataJSON = createCustomSchemaJSON(data);
      System.out.println("CUSTOM Schema: " + schemaDataJSON);
    }
    return schemaDataJSON;
  }

  private static String createCustomSchemaJSON(String data) {
    System.out.println("\nBuild the SCHEMA request to add new schema to the ledger as a Steward\n");
    String name = "health_record";
    String version = "1.0";
    String attributes = "[\"age\", \"sex\", \"height\", \"name\"]";
    String id = "1";
    return new JSONObject("{\"name\":\"" + name + "\",\"version\":\"" + version + "\",\"attrNames\":" + attributes + ",\"ver\":\"" + version + "\",\"id\":\"" + id + "\"}").toString();
  }
}
