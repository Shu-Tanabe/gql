import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
// const REGION = "REGION";
const ENDPOINT: string = "http://localhost:8000";
const ddbClient = new DynamoDBClient({ endpoint: ENDPOINT });
export { ddbClient };
