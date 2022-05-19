import {
  MutationResolvers,
  MutationAddRestaurantArgs,
  AddRestaurantInput,
} from "../../types/generated/graphql";
import { v4 as uuidv4 } from "uuid";
import { DynamoDBClient, PutItemCommand } from "@aws-sdk/client-dynamodb";
import {
  Restaurant,
  RestaurantDynamoType,
} from "../../types/models/restaurantModels";

const ddb = new DynamoDBClient({
  endpoint: "http://localhost:8000",
});

const putRestaurant = async (restaurant: RestaurantDynamoType) => {
  try {
    const data = await ddb.send(
      new PutItemCommand({
        TableName: "Restaurant",
        Item: restaurant,
      })
    );
    return data;
  } catch (err) {
    console.error(err);
    return err;
  }
};

export const addRestaurant: MutationResolvers["addRestaurant"] = async (
  parent,
  args,
  context,
  info
) => {
  try {
    let restaurantId = uuidv4();
    const addedDatetime = new Date();
    if (
      args.restaurantInput.description === null ||
      args.restaurantInput.description === undefined
    ) {
      args.restaurantInput.description = "";
    }
    const covertedCustomer: RestaurantDynamoType = {
      RestaurantId: { S: restaurantId },
      RestaurantName: { S: args.restaurantInput.restaurantName },
      Score: { N: args.restaurantInput.score.toString() },
      Introducer: { S: args.restaurantInput.introducer },
      Description: { S: args.restaurantInput.description },
      UpdatedDate: { S: addedDatetime.toString() },
      Occasion: { S: args.restaurantInput.occasion },
    };
    const restaurant = await putRestaurant(covertedCustomer);
    return dummyRestaurant;
  } catch (err) {
    throw new Error();
  }
};

const dummyRestaurant: Restaurant = {
  restaurantId: "test",
  restaurantName: "test",
  score: 1,
  updatedDate: new Date("2022-12-12"),
  introducer: "test",
  description: "test",
  occasion: "Dating",
};
