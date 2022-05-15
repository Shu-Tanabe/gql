import { MutationResolvers, Status } from "../../types/generated/graphql";

import { DynamoDBClient, DeleteItemCommand } from "@aws-sdk/client-dynamodb";
import {
  Restaurant,
  RestaurantDynamoType,
} from "../../types/models/restaurantModels";

const ddb = new DynamoDBClient({
  endpoint: "http://localhost:8000",
});

const removeRestaurant = async (id: string) => {
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

export const deleteRestaurant: MutationResolvers["deleteRestaurant"] = async (
  parent,
  args,
  context,
  info
) => {
  if (args.restaurantId === null || args.restaurantId === undefined) {
    throw new Error();
  }

  const data: any = removeRestaurant(args.restaurantId);

  const responseStatus: Status = "OK";

  return responseStatus;
};
