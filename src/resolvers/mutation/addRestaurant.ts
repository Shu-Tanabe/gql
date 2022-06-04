import {
  MutationResolvers,
  AddRestaurantInput,
} from "../../types/generated/graphql";
import { v4 as uuidv4 } from "uuid";
import {
  TRestaurant,
  TRestaurantDynamo,
} from "../../types/models/restaurantModels";
import { putRestaurantRepos } from "../../repositories/putRestaurant";
import { validateRestaurant } from "../validators/restaurantValidators";

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
  if (addedRestaurantData.introducer === undefined) {
    throw new Error();
  }
  const description: string = addedRestaurantData.description ?? "";
  const restaurantData: Required<AddRestaurantInput> = {
    restaurantName: addedRestaurantData.restaurantName,
    score: addedRestaurantData.score,
    introducer: addedRestaurantData.introducer,
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
    const valid = validateRestaurant(args.restaurantInput);
    if (!valid) {
      console.log(valid);
      throw new Error();
    }
    let restaurantId = uuidv4();
    const addedDatetime = new Date();

    const covertedRestaurant: TRestaurantDynamo = {
      RestaurantId: { S: restaurantId },
      RestaurantName: { S: restaurantData.restaurantName },
      Score: { N: restaurantData.score.toString() },
      Introducer: { S: restaurantData.introducer },
      Description: { S: restaurantData.description ?? "" },
      UpdatedDate: { S: addedDatetime.toString() },
      Occasion: { S: restaurantData.occasion },
    };

    const restaurant = await putRestaurantRepos(covertedRestaurant);

    const returnRestaurant: TRestaurant = {
      restaurantId: restaurantId,
      restaurantName: restaurantData.restaurantName,
      score: restaurantData.score,
      description: restaurantData.description ?? "",
      introducer: restaurantData.introducer,
      occasion: restaurantData.occasion,
      updatedDate: addedDatetime,
    };

    return returnRestaurant;
  } catch (err) {
    throw new Error();
  }
};
