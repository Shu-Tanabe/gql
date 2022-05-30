import { MutationResolvers } from "../../types/generated/graphql";

import {
  TRestaurant,
  TRestaurantDynamo,
} from "../../types/models/restaurantModels";
import { DynamoDBClient, UpdateItemCommand } from "@aws-sdk/client-dynamodb";

type UpdatableRestaurant = Omit<
  TRestaurant,
  "restaurantId" | "introducer" | "occasion" | "updatedDate"
>;

const ddb = new DynamoDBClient({
  endpoint: "http://localhost:8000",
});

const updateItem = async (id: string, restaurant: UpdatableRestaurant) => {
  try {
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
          // "#updateDt": "UpdateDate",
        },
        ExpressionAttributeValues: {
          ":restaurantName": { S: restaurant.restaurantName },
          ":score": { N: restaurant.score.toString() },
          ":description": { S: restaurant.description },
          // ":updateDate": { S: restaurant.updatedDate.toISOString() },
        },
        UpdateExpression:
          // "SET #rName = :restaurantName, #sco = :score, #desc = :description, #updateDt = :updateDate",
          "SET #rName = :restaurantName, #sco = :score, #desc = :description",
        // "SET #rName = :restaurantName",
        // ConditionExpression: `attribute_exists(${id})`,
      })
    );

    return data;
  } catch (err) {
    console.log(err);
    throw new Error(err);
  }
};

export const updateRestaurant: MutationResolvers["updateRestaurant"] = async (
  parent,
  args,
  context,
  info
) => {
  const data: any = await updateItem(args.restaurantId, args.restaurantUpdate);

  const convertedRestaurant: TRestaurant = {
    restaurantId: args.restaurantId,
    restaurantName: data.restaurantName,
    score: data.score,
    description: data.description,
    introducer: data.introducer,
    occasion: data.occasion,
    updatedDate: data.updateDate,
  };

  return dummyRestaurant;
};

const dummyRestaurant: TRestaurant = {
  restaurantId: "test",
  restaurantName: "test",
  score: 1,
  updatedDate: new Date("2022-12-12"),
  introducer: "test",
  description: "test",
  occasion: "Dating",
};
