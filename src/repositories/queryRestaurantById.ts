import { DynamoDBClient, GetItemCommand } from "@aws-sdk/client-dynamodb";

const ddb = new DynamoDBClient({
  endpoint: "http://localhost:8000",
});

export const queryRestaurantById = async (id: string): Promise<any> => {
  try {
    const data: any = await ddb.send(
      new GetItemCommand({
        TableName: "Restaurant",
        Key: {
          RestaurantId: { S: id },
          Occasion: { S: "Dating" },
        },
      })
    );

    return data.Item;
  } catch (err) {
    console.log(err);
    throw new Error(err);
  }
};
