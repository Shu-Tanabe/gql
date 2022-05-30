import Ajv, { JSONSchemaType } from "ajv";
import {
  MutationResolvers,
  AddRestaurantInput,
} from "../../types/generated/graphql";

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

export const validateRestaurant = ajv.compile(addRestaurantSchema);
