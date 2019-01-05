package eu.mhutti1.healthchain.constants;

/**
 * Created by nmatej1 on 28/11/2018.
 */
public class HealthRecordAttributesStandard implements HealthRecordAttributes {

    public static String schemaId = "3";

    public static String version = "1.0";

    public static String name = "health_record_standard_sectioned";
    
    public static String[] attrs = new String[]{
            "{\"name\": \"Name\", \"type\": \"string\"}",
            "{\"name\": \"NIN\", \"type\": \"string\"}",
            "{\"name\": \"Gender\", \"type\": \"string\"}",
            "{\"name\": \"Birthdate\", \"type\": \"string\"}",
            "{\"name\": \"Address\", \"type\": \"string\"}",
            "{\"name\": \"Marital status\", \"type\": \"string\"}",
            "{\"name\": \"Photo link\", \"type\": \"string\"}",
            "{\"name\": \"Contact phone\", \"type\": \"string\"}",
            "{\"name\": \"Heart rate\", \"type\": \"number\", \"unit\": \"bpm\"}",
            "{\"name\": \"Heart pressure sys\", \"type\": \"number\", \"unit\": \"mmHg\"}",
            "{\"name\": \"Heart pressure dia\", \"type\": \"number\", \"unit\": \"mmHg\"}",
            "{\"name\": \"Activity level\", \"type\": \"string\"}",
            "{\"name\": \"Trees\", \"type\": \"string\"}",
            "{\"name\": \"Flowers\", \"type\": \"string\"}",
            "{\"name\": \"Weeds\", \"type\": \"string\"}",
            "{\"name\": \"Grasses\", \"type\": \"string\"}",
            "{\"name\": \"Animals\", \"type\": \"string\"}",
            "{\"name\": \"Insects\", \"type\": \"string\"}",
            "{\"name\": \"Foods\", \"type\": \"string\"}",
            "{\"name\": \"Medications\", \"type\": \"string\"}",
            "{\"name\": \"Cholesterol\", \"type\": \"number\", \"unit\": \"mg/dL\"}",
            "{\"name\": \"WBCs\", \"type\": \"number\", \"unit\": \"cmm\"}",
            "{\"name\": \"RBCs\", \"type\": \"number\", \"unit\": \"cmm\"}",
            "{\"name\": \"Platelets\", \"type\": \"number\", \"unit\": \"cmm\"}",
            "{\"name\": \"Hematocrit\", \"type\": \"number\", \"unit\": \"cmm\"}",
            "{\"name\": \"Hemoglobin\", \"type\": \"number\", \"unit\": \"g/dL\"}",
            "{\"name\": \"MCV\", \"type\": \"number\", \"unit\": \"cmm\"}",
            "{\"name\": \"MCH\", \"type\": \"number\", \"unit\": \"pg\"}",
            "{\"name\": \"MPV\", \"type\": \"number\", \"unit\": \"cmm\"}",
            "{\"name\": \"Right correction\", \"type\": \"number\", \"unit\": \"\"}",
            "{\"name\": \"Left correction\", \"type\": \"number\", \"unit\": \"\"}",
            "{\"name\": \"Past surgeries\", \"type\": \"string\"}",
            "{\"name\": \"Medications\", \"type\": \"string\"}",
            "{\"name\": \"Existing conditions\", \"type\": \"string\"}",
            "{\"name\": \"Last checkup date\", \"type\": \"string\"}"
    };
    
    public static String attributes = "[\"Name\"," +
            "\"NIN\"," +
            "\"Gender\"," +
            "\"Birthdate\"," +
            "\"Address\"," +
            "\"Marital status\"," +
            "\"Photo link\"," +
            "\"Contact phone\"," +
            "\"Heart rate\"," +
            "\"Heart pressure sys\"," +
            "\"Heart pressure dia\"," +
            "\"Activity level\"," +
            "\"Tress\"," +
            "\"Flowers\"," +
            "\"Weeds\"," +
            "\"Grasses\"," +
            "\"Animals\"," +
            "\"Insects\"," +
            "\"Foods\"," +
            "\"Medications\"," +
            "\"Cholesterol\"," +
            "\"WBCs\"," +
            "\"RBCs\"," +
            "\"Platelets\"," +
            "\"Hematocrit\"," +
            "\"Hemoglobin\"," +
            "\"MCV\"," +
            "\"MCH\"," +
            "\"MPV\"," +
            "\"Right correction\"," +
            "\"Left correction\"," +
            "\"Past surgeries\"," +
            "\"Medications\"," +
            "\"Existing conditions\"," +
            "\"Last checkup date\"]";
}