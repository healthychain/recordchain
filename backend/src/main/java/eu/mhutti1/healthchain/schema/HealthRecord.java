package eu.mhutti1.healthchain.schema;

import org.json.JSONObject;

import static org.hyperledger.indy.sdk.ledger.Ledger.buildSchemaRequest;

/**
 * Created by jedraz on 24/10/2018.
 */
public class HealthRecord {

  private String schemaDataJSON;

  public HealthRecord() {
    System.out.println("\nBuild the SCHEMA request to add new schema to the ledger as a Steward\n");
    String name = "health_record";
    String version = "1.0";
    String attributes = "[\"age\", \"sex\", \"height\", \"name\"]";
    String id = "1";
    this.schemaDataJSON = new JSONObject("{\"name\":\"" + name + "\",\"version\":\"" + version + "\",\"attrNames\":" + attributes + ",\"ver\":\"" + version + "\",\"id\":\"" + id + "\"}").toString();
    System.out.println("Schema: " + this.schemaDataJSON);
  }

  public String getSchemaDataJSON() {
    return schemaDataJSON;
  }
}
