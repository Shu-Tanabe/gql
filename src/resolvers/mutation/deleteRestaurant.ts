import { MutationResolvers, Status } from "../../types/generated/graphql";
import { testRestaurantData } from "../testData";

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
    const newTestRestaurantData = await testRestaurantData.filter(
      (data) => data.restaurantId != args.restaurantId
    );

    await console.log(newTestRestaurantData);

    const responseStatus: Status = "OK";

    return responseStatus;
  } catch (err) {
    console.log(err);
    throw new Error(err);
  }
};
