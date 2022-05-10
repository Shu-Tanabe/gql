import { QueryResolvers } from "../../types/generated/graphql";

import { DynamoDBClient, ScanCommand } from "@aws-sdk/client-dynamodb";
import { RestaurantDynamoType } from "../../types/models/restaurantModels";
import { Restaurant } from "../../types/generated/graphql";

const ddb = new DynamoDBClient({
  endpoint: "http://localhost:8000",
});

const scanRestaurants = async () => {
  try {
    const data = await ddb.send(
      new ScanCommand({
        TableName: "Restaurant",
      })
    );
    return data.Items;
  } catch (err) {
    return err;
  }
};

const convertRestaurant = (
  dynamoRestaurant: RestaurantDynamoType
): Restaurant => {
  const rest: Restaurant = {
    restaurantId: dynamoRestaurant.RestaurantId.S,
    restaurantName: dynamoRestaurant.RestaurantName.S,
    score: Number(dynamoRestaurant.Score.N),
    description: dynamoRestaurant.Description.S,
    updatedDate: dynamoRestaurant.UpdatedDate.S,
    introducer: dynamoRestaurant.Introducer.S,
  };

  return rest;
};

export const getRestaurants: QueryResolvers["getRestaurants"] = async (
  parent,
  args,
  context,
  info
) => {
  const res: RestaurantDynamoType[] = await scanRestaurants();
  let gotRestaurants: Restaurant[] = [];
  for (let i = 0; i < res.length; i++) {
    const converted = convertRestaurant(res[i]);
    gotRestaurants.push(converted);
  }
  return gotRestaurants;
};
