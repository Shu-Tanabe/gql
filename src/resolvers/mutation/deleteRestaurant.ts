import { MutationResolvers, Status } from "../../types/generated/graphql";
import { deleteRestaurantRepos } from "../../repositories/deleteRestaurant";

export const deleteRestaurant: MutationResolvers["deleteRestaurant"] = async (
  parent,
  args,
  context,
  info
) => {
  if (args.restaurantId === null || args.restaurantId === undefined) {
    throw new Error();
  }
  try {
    await deleteRestaurantRepos(args.restaurantId);

    const responseStatus: Status = "OK";

    return responseStatus;
  } catch (err) {
    console.log(err);
    throw new Error(err);
  }
};
