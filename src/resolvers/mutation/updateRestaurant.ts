import { MutationResolvers } from "../../types/generated/graphql";

import { TUpdatableRestaurant } from "../../types/models/restaurantModels";
import { updateRestaurantInfo } from "../../repositories/updateRestaurant";

export const updateRestaurant: MutationResolvers["updateRestaurant"] = async (
  parent,
  args,
  context,
  info
) => {
  try {
    const data: any = await updateRestaurantInfo(
      args.restaurantId,
      args.restaurantUpdate
    );

    const convertedRestaurant: TUpdatableRestaurant & { restaurantId: string } =
      {
        restaurantId: args.restaurantId,
        restaurantName: args.restaurantUpdate.restaurantName,
        score: args.restaurantUpdate.score,
        description: args.restaurantUpdate.description,
      };

    return convertedRestaurant;
  } catch (err) {
    throw new Error();
  }
};
