package eu.mhutti1.healthchain.constants;

import org.json.JSONObject;

import static org.hyperledger.indy.sdk.ledger.Ledger.buildSchemaRequest;

/**
 * Created by jedraz on 24/10/2018.
 */
public class HealthRecord {

  private static String schemaId = "1";
  private static String schemaDataJSON;

  public static String getSchemaDataJSON() {
    if(schemaDataJSON == null) {
      schemaDataJSON = createSchemaDataJSON();
      System.out.println("Schema: " + schemaDataJSON);
    }
    return schemaDataJSON;
  }

  public static String getSchemaDataId() {
    return schemaId;
  }

  private static String createSchemaDataJSON() {
    System.out.println("\nBuild the SCHEMA request to add new schema to the ledger as a Steward\n");
    String name = "health_record";
    String version = "1.0";
    String attributes = "[\"age\", \"sex\", \"height\", \"name\"]";
    String id = schemaId;
    return new JSONObject("{\"name\":\"" + name + "\",\"version\":\"" + version + "\",\"attrNames\":" + attributes + ",\"ver\":\"" + version + "\",\"id\":\"" + id + "\"}").toString();
  }

  public static String[] attrs = new String[]{
          "{\"name\": \"age\", \"type\": \"number\", \"unit\":\"years\"}",
          "{\"name\": \"height\", \"type\": \"number\", \"unit\":\"cm\"}",
          "{\"name\": \"sex\", \"type\": \"string\"}",
          "{\"name\": \"name\", \"type\": \"string\"}"
  };
}
