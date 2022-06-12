import { MutationResolvers } from "../../types/generated/graphql";
import { EnteredRestaurant } from "../../types/generated/graphql";
import { testRestaurantData } from "../testData";

export const updateRestaurant: MutationResolvers["updateRestaurant"] = async (
  parent,
  args,
  context,
  info
) => {
  try {
    const willUpdatedRestaurant: EnteredRestaurant | undefined =
      testRestaurantData.find(
        (data) => data.restaurantId === args.restaurantId
      );

    if (willUpdatedRestaurant === undefined) {
      throw new Error();
    }

    const newTestTestaurantData = await testRestaurantData.map((data) =>
      data.restaurantId === args.restaurantId
        ? {
            ...data,
            restaurantName: args.restaurantUpdate.restaurantName,
            score: args.restaurantUpdate.score,
            description: args.restaurantUpdate.description,
            occasion: args.restaurantUpdate.occasion,
          }
        : data
    );

    const updatedRestaurant: EnteredRestaurant = await {
      ...willUpdatedRestaurant,
      restaurantName: args.restaurantUpdate.restaurantName,
      score: args.restaurantUpdate.score,
      description: args.restaurantUpdate.description,
      occasion: args.restaurantUpdate.occasion,
    };

    await console.log(newTestTestaurantData);

    return updatedRestaurant;
  } catch (err) {
    console.log(err);
    throw new Error();
  }
};
