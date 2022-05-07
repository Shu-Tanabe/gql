export type Restaurant = {
  restaurantId: string;
  restaurantName: string;
  score: number;
  introducer: string;
  description: string;
  updatedDate: Date;
};

export type RestaurantDynamoType = {
  RestaurantId: { S: string };
  RestaurantName: { S: string };
  Score: { N: string };
  Introducer: { S: string };
  Description: { S: string };
  UpdatedDate: { S: string };
};
