import { DynamoDBClient, PutItemCommand } from "@aws-sdk/client-dynamodb";
import { TRestaurantDynamo } from "../types/models/restaurantModels";

const ddb = new DynamoDBClient({
  endpoint: "http://localhost:8000",
});

export const putRestaurantRepos = async (
  restaurant: TRestaurantDynamo
): Promise<any> => {
  try {
    const restaurantPutItem = await ddb.send(
      new PutItemCommand({
        TableName: "Restaurant",
        Item: restaurant,
      })
    );
    return restaurantPutItem;
  } catch (err) {
    console.error(err);
    return err;
  }
};
