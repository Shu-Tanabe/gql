import { Resolvers } from "../types/generated/graphql";
import * as mutaiton from "./mutation/";

const resolvers: Resolvers = {
  Mutation: mutaiton,
};

export default resolvers;
