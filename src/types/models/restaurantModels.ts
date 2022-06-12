export type TRestaurant = {
  restaurantId: string;
  restaurantName: string;
  score: number;
  introducerId: string;
  description: string;
  updatedDate: Date;
  occasion: "Dating" | "Alone" | "Friends" | "Colleague";
};

export type TUpdatableRestaurant = Omit<
  TRestaurant,
  "restaurantId" | "introducerId" | "occasion" | "updatedDate"
>;

// export type TRestaurantDynamo = {
//   RestaurantId: { S: string };
//   RestaurantName: { S: string };
//   Score: { N: string };
//   Introducer: { S: string };
//   Description: { S: string };
//   UpdatedDate: { S: string };
//   Occasion: { S: string };
// };

export type TUser = {
  userId: string;
  userName: string;
  password: string;
  mail: string;
  recommendRestaurantId: string[];
};
