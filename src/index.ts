import { GraphQLFileLoader } from "@graphql-tools/graphql-file-loader";
import { loadSchemaSync } from "@graphql-tools/load";
import { addResolversToSchema } from "@graphql-tools/schema";
import { ApolloServer } from "apollo-server";
import { join } from "path";

const schema = loadSchemaSync(join(__dirname, "../schema.graphql"), {
  loaders: [new GraphQLFileLoader()],
});

const customers = [
  {
    customerId: "vujnswbirbhvjwsd",
    customerName: "Kate Chopin",
  },
  {
    customerId: "ndskbjrfjwhkds",
    customerName: "Paul Auster",
  },
];

const resolvers = {
  Query: {
    customers: () => customers,
  },
};

const schemaWithResolvers = addResolversToSchema({ schema, resolvers });
const server = new ApolloServer({ schema: schemaWithResolvers });

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
