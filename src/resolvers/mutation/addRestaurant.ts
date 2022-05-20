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
import Ajv, { JSONSchemaType } from "ajv";

const ajv = new Ajv();

const addRestaurantSchema: JSONSchemaType<AddRestaurantInput> = {
  required: ["restaurantName", "score", "introducer", "occasion"],
  type: "object",
  properties: {
    restaurantName: {
      type: "string",
      pattern: "^[ぁ-んァ-ヶｱ-ﾝﾞﾟ一-龠0-9a-zA-Z]*$",
      maximum: 32,
      minimum: 1,
    },
    score: {
      type: "number",
    },
    introducer: {
      type: "string",
    },
    occasion: {
      type: "string",
    },
    description: {
      type: "string",
      nullable: true,
    },
  },
};

const validateRestaurant = ajv.compile(addRestaurantSchema);

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

const validateAddRestaurantInput = (
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
  if (
    addedRestaurantData.description === undefined ||
    addedRestaurantData.description === null
  ) {
    addedRestaurantData.description = "";
  }
  const description: string = addedRestaurantData.description
    ? addedRestaurantData.description
    : "";
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
  const valid = validateRestaurant(args.restaurantInput);
  console.log(valid);
  if (!valid) {
    console.log(valid);
  } else {
    try {
      const restaurantData: Required<AddRestaurantInput> =
        validateAddRestaurantInput(args.restaurantInput);
      let restaurantId = uuidv4();
      const addedDatetime = new Date();

      const description: string = restaurantData.description
        ? restaurantData.description
        : "";

      const covertedCustomer: RestaurantDynamoType = {
        RestaurantId: { S: restaurantId },
        RestaurantName: { S: restaurantData.restaurantName },
        Score: { N: restaurantData.score.toString() },
        Introducer: { S: restaurantData.introducer },
        Description: { S: description },
        UpdatedDate: { S: addedDatetime.toString() },
        Occasion: { S: restaurantData.occasion },
      };
      const restaurant = await putRestaurant(covertedCustomer);
      return dummyRestaurant;
    } catch (err) {
      throw new Error();
    }
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
