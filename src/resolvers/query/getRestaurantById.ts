import { QueryResolvers } from "../../types/generated/graphql";

import {
  DynamoDBClient,
  GetItemCommand,
  GetItemCommandInput,
  QueryCommand,
} from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";
import { RestaurantDynamoType } from "../../types/models/restaurantModels";
import { Restaurant } from "../../types/generated/graphql";
import * as sdk from "aws-sdk";

const ddb = new DynamoDBClient({
  endpoint: "http://localhost:8000",
});

// const dynamoDbDocClient = DynamoDBDocumentClient.from(ddb);

const queryRestaurant = async (id: string) => {
  // const params: sdk.DynamoDB.DocumentClient.QueryInput = {
  //   TableName: "Restaurant",
  //   KeyConditionExpression: "#RestaurantId = :RestaurantId",
  //   ExpressionAttributeNames: {
  //     "#RestaurantId": "id",
  //   },
  //   ExpressionAttributeValues: {
  //     ":RestaurantId": {
  //       S: id,
  //     },
  //   },
  // };

  try {
    // const data: any = await dynamoDbDocClient.send(new QueryCommand(params));
    const data: any = await ddb.send(
      new GetItemCommand({
        TableName: "Restaurant",
        Key: {
          RestaurantId: { S: id },
          Occasion: { S: "Dating" },
        },
      })
    );
    console.log(data);

    return data.Item;
  } catch (err) {
    console.log(err);
    throw new Error(err);
  }
};

export const getRestaurantById: QueryResolvers["getRestaurantById"] = async (
  parent,
  args,
  context,
  info
) => {
  const restaurant: RestaurantDynamoType = await queryRestaurant(
    args.restaurantId
  );
  const convertedRestaurant: Restaurant = {
    restaurantId: restaurant.RestaurantId.S,
    restaurantName: restaurant.RestaurantName.S,
    score: Number(restaurant.Score.N),
    description: restaurant.Description.S,
    introducer: restaurant.Introducer.S,
    updatedDate: restaurant.UpdatedDate.S,
    occasion: restaurant.Occasion.S,
  };

  return convertedRestaurant;
};
