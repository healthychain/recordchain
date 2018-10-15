export default {
    MAX_ATTACHMENT_SIZE: 5000000,

    s3: {
        REGION: "us-east-2",
        BUCKET: "notes-app-testing"
    },
    apiGateway: {
        REGION: "us-east-2",
        URL: ""
    },
    cognito: {
        REGION: "us-east-2",
        USER_POOL_ID: "",
        APP_CLIENT_ID: "",
        IDENTITY_POOL_ID: ""
    }
};