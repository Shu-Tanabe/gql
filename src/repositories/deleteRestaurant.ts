import { DynamoDBClient, DeleteItemCommand } from "@aws-sdk/client-dynamodb";

const ddb = new DynamoDBClient({
  endpoint: "http://localhost:8000",
});

export const deleteRestaurantRepos = async (id: string) => {
  try {
    const data = await ddb.send(
      new DeleteItemCommand({
        TableName: "Restaurant",
        Key: {
          RestaurantId: { S: id },
          Occasion: { S: "Dating" },
        },
      })
    );
    return data;
  } catch (err) {
    throw new Error(err);
  }
};
