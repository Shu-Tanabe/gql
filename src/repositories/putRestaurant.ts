import {
  TRestaurantDynamo,
  TRestaurant,
} from "../types/models/restaurantModels";
import { PutCommand } from "@aws-sdk/lib-dynamodb";
import { ddbDocClient } from "../lib/ddbDocClient";

// export const putRestaurantRepos = async (
//   restaurant: TRestaurantDynamo
// ): Promise<any> => {
//   try {
//     const restaurantPutItem = await ddb.send(
//       new PutItemCommand({
//         TableName: "Restaurant",
//         Item: restaurant,
//       })
//     );
//     return restaurantPutItem;
//   } catch (err) {
//     console.error(err);
//     return err;
//   }
// };

const setParams = (restaurant: TRestaurant) => {
  const dataSets = [
    {
      dataType: "RestaurantName",
      dataValue: restaurant.restaurantName,
    },
    { dataType: "Score", dataValue: restaurant.score },
    { dataType: "IntroducerId", dataValue: restaurant.introducer },
    { dataType: "Description", dataValue: restaurant.description },
    { dataType: "UpdatedDate", dataValue: restaurant.updatedDate },
    { dataType: "Occasion", dataValue: restaurant.occasion },
  ];

  return dataSets;
  // const params = [
  //   {
  //     TableName: "RestaurantsAndUsers",
  //     Item: {
  //       primaryKey: restaurant.restaurantId,
  //       sortKey: ,
  //       DataValue:
  //     }
  //   }
  // ]
};

export const putRestaurantRepos = async (restaurant: TRestaurant) => {
  // const params = {
  //   TableName: "RestaurantsAndUsers",
  //   Item: {
  //     primaryKey: restaurant.restaurantId,
  //     sortKey: "RestaurantName",
  //     dataValue: restaurant.restaurantName,
  //   },
  // };
  const TABLENAME = "RestaurantsAndUsers";
  const PK = restaurant.restaurantId;

  const dataParams = setParams(restaurant);
  for (const data of dataParams) {
    let params = {
      TableName: TABLENAME,
      Item: {
        primaryKey: PK,
        sortKey: data.dataType,
        dataValue: data.dataValue,
      },
    };
    try {
      const data = await ddbDocClient.send(new PutCommand(params));
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  }
};
