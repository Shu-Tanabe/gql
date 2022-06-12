import {
  MutationResolvers,
  AddRestaurantInput,
  EnteredRestaurant,
} from "../../types/generated/graphql";
import { v4 as uuidv4 } from "uuid";
import { testRestaurantData } from "../testData";

const isNullOrUndefinedContained = (
  addedRestaurantData?: Partial<AddRestaurantInput> | null
): Required<AddRestaurantInput> => {
  if (addedRestaurantData === undefined || addedRestaurantData === null) {
    throw new Error();
  }
  if (addedRestaurantData.restaurantName === undefined) {
    throw new Error();
  }
  if (addedRestaurantData.score === undefined) {
    throw new Error();
  }
  if (addedRestaurantData.occasion === undefined) {
    throw new Error();
  }
  if (addedRestaurantData.introducerId === undefined) {
    throw new Error();
  }
  const description: string = addedRestaurantData.description ?? "";
  const restaurantData: Required<AddRestaurantInput> = {
    restaurantName: addedRestaurantData.restaurantName,
    score: addedRestaurantData.score,
    introducerId: addedRestaurantData.introducerId,
    occasion: addedRestaurantData.occasion,
    description: description,
  };
  return restaurantData;
};

export const addRestaurant: Required<
  MutationResolvers["addRestaurant"]
> = async (parent, args, context, info) => {
  try {
    const restaurantData: Required<AddRestaurantInput> =
      isNullOrUndefinedContained(args.restaurantInput);
    const restaurantId = uuidv4();
    const addedDatetime = new Date();

    const newRestaurant: EnteredRestaurant = {
      restaurantId: restaurantId,
      restaurantName: restaurantData.restaurantName,
      score: restaurantData.score,
      description: restaurantData.description ?? "",
      introducerId: restaurantData.introducerId,
      occasion: restaurantData.occasion,
      updateDate: addedDatetime,
    };

    await testRestaurantData.push(newRestaurant);
    await console.log(testRestaurantData);

    return newRestaurant;
  } catch (err) {
    throw new Error();
  }
};
