import { QueryResolvers } from "../../types/generated/graphql";
import { TRestaurantDynamo } from "../../types/models/restaurantModels";
import { Restaurant } from "../../types/generated/graphql";
import { queryRestaurantById } from "../../repositories/queryRestaurantById";

export const getRestaurantById: QueryResolvers["getRestaurantById"] = async (
  parent,
  args,
  context,
  info
) => {
  const restaurant: TRestaurantDynamo = await queryRestaurantById(
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
