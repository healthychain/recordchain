package eu.mhutti1.healthchain.constants;

public class HealthRecordAttributesLegacy implements HealthRecordAttributes {

    public static String schemaId = "1";

    public static String version = "1.0";

    public static String name = "health_record";

    public static String attributes = "[\"age\", \"sex\", \"height\", \"name\"]";

    public static String[] attrs = new String[]{
            "{\"name\": \"age\", \"type\": \"number\", \"unit\":\"years\"}",
            "{\"name\": \"height\", \"type\": \"number\", \"unit\":\"cm\"}",
            "{\"name\": \"sex\", \"type\": \"string\"}",
            "{\"name\": \"name\", \"type\": \"string\"}"
    };
}
