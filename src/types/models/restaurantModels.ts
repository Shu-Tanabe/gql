export type TRestaurant = {
  restaurantId: string;
  restaurantName: string;
  score: number;
  introducer: string;
  description?: string;
  updatedDate: Date;
  occasion: "Dating" | "Alone" | "Friends" | "Colleague";
};

export type TUpdatableRestaurant = Omit<
  TRestaurant,
  "restaurantId" | "introducer" | "occasion" | "updatedDate"
>;

export type TRestaurantDynamo = {
  RestaurantId: { S: string };
  RestaurantName: { S: string };
  Score: { N: string };
  Introducer: { S: string };
  Description: { S: string };
  UpdatedDate: { S: string };
  Occasion: { S: string };
};
