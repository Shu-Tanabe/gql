import { TRestaurant, TUser } from "../types/models/restaurantModels";
import { EnteredRestaurant } from "../types/generated/graphql";

export let testRestaurantData: EnteredRestaurant[] = [
  {
    restaurantId: "test001",
    restaurantName: "TestRestaurant",
    score: 23,
    introducerId: "asdvcjkns",
    description: "good",
    occasion: "Alone",
    updateDate: new Date("2021-12-30"),
  },
  {
    restaurantId: "test002",
    restaurantName: "ExpRestaurant",
    score: 23,
    introducerId: "asdvcjkns",
    description: "good",
    occasion: "Dating",
    updateDate: new Date("2020-12-08"),
  },
  {
    restaurantId: "test003",
    restaurantName: "GachiRestaurant",
    score: 20,
    introducerId: "user001",
    description: "good",
    occasion: "Alone",
    updateDate: new Date("2010-10-30"),
  },
];

export let testUserData: TUser[] = [
  {
    userId: "user001",
    userName: "Shu Tanabe",
    password: "cskldnvfiwdv",
    mail: "sfcofc@gmail.com",
    recommendRestaurantId: ["test003"],
  },
  {
    userId: "user002",
    userName: "Akihiro Ishii",
    password: "cskldnvfiwdv00",
    mail: "sfcofc@gmail.com",
    recommendRestaurantId: ["test001", "test002"],
  },
];
