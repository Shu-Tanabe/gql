import { DynamoDBClient, UpdateItemCommand } from "@aws-sdk/client-dynamodb";
import {
  TRestaurant,
  TUpdatableRestaurant,
} from "../types/models/restaurantModels";

const ddb = new DynamoDBClient({
  endpoint: "http://localhost:8000",
});

export const updateRestaurantInfo = async (
  id: string,
  restaurant: TUpdatableRestaurant
) => {
  try {
    const updatedDate: string = new Date().toDateString();
    const data = await ddb.send(
      new UpdateItemCommand({
        TableName: "Restaurant",
        Key: {
          RestaurantId: { S: id },
          Occasion: { S: "Dating" },
        },
        ExpressionAttributeNames: {
          "#rName": "RestaurantName",
          "#sco": "Score",
          "#desc": "Description",
          "#updateDt": "UpdateDate",
        },
        ExpressionAttributeValues: {
          ":restaurantName": { S: restaurant.restaurantName },
          ":score": { N: restaurant.score.toString() },
          ":description": { S: restaurant.description ?? "" },
          ":updateDate": { S: updatedDate },
        },
        UpdateExpression:
          "SET #rName = :restaurantName, #sco = :score, #desc = :description, #updateDt = :updateDate",
        ConditionExpression: `attribute_exists(RestaurantId)`,
      })
    );

    return data;
  } catch (err) {
    console.log(err);
    throw new Error(err);
  }
};
