import {
  MutationResolvers,
  AddRestaurantInput,
} from "../../types/generated/graphql";
import { v4 as uuidv4 } from "uuid";
import {
  DynamoDBClient,
  PutItemCommand,
  GetItemCommand,
} from "@aws-sdk/client-dynamodb";
import {
  Restaurant,
  RestaurantDynamoType,
} from "../../types/models/restaurantModels";
import Ajv, { JSONSchemaType } from "ajv";
import { queryRestaurant } from "../query/getRestaurantById";

const ajv = new Ajv();

const addRestaurantSchema: JSONSchemaType<AddRestaurantInput> = {
  required: ["restaurantName", "score", "introducer", "occasion"],
  type: "object",
  properties: {
    restaurantName: {
      type: "string",
      pattern: "^[ぁ-んァ-ヶーｱ-ﾝﾞﾟ一-龠０-９0-9a-zA-Zａ-ｚＡ-Ｚ-]*$",
      maximum: 32,
      minimum: 1,
    },
    score: {
      type: "number",
      maximum: 20,
    },
    introducer: {
      type: "string",
      maximum: 20,
    },
    occasion: {
      type: "string",
      maximum: 20,
    },
    description: {
      type: "string",
      pattern: "^[ぁ-んァ-ヶーｱ-ﾝﾞﾟ一-龠０-９0-9a-zA-Zａ-ｚＡ-Ｚ-]*$",
      maximum: 500,
      nullable: true,
    },
  },
};

const validateRestaurant = ajv.compile(addRestaurantSchema);

const ddb = new DynamoDBClient({
  endpoint: "http://localhost:8000",
});

const putRestaurant = async (
  restaurant: RestaurantDynamoType
): Promise<any> => {
  try {
    const restaurantPutItem = await ddb.send(
      new PutItemCommand({
        TableName: "Restaurant",
        Item: restaurant,
      })
    );
    return restaurantPutItem;
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

      const covertedRestaurant: RestaurantDynamoType = {
        RestaurantId: { S: restaurantId },
        RestaurantName: { S: restaurantData.restaurantName },
        Score: { N: restaurantData.score.toString() },
        Introducer: { S: restaurantData.introducer },
        Description: { S: description },
        UpdatedDate: { S: addedDatetime.toString() },
        Occasion: { S: restaurantData.occasion },
      };
      const restaurant = await putRestaurant(covertedRestaurant);
      const returnRestaurant: Restaurant = {
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
