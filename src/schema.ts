import { gql } from "apollo-server";

export const typeDefs = gql`
  type Launch {
    id: ID!
    site: String
    mission: Mission
    rocket: Rocket
    isBooked: Boolean!
  }
  type Mission {
    name: String
    missionPatch(mission: String, size: PatchSize): String
  }

  type Rocket {
    id: ID!
    name: String
    type: String
  }
  enum PatchSize {
    SMALL
    LARGE
  }
  type Query {
    launch(id: ID!): Launch
    launches(pageSize: Int, after: String): LaunchConnection!
    me: User
  }
  type User {
    id: ID!
    email: String!
    trips: [Launch]!
    profileImage: String
    token: String
  }
  type Mission {
    name: String
    missionPatch(size: PatchSize): String
  }

  type TripUpdateResponse {
    success: Boolean!
    message: String
    launches: [Launch]
  }

  type LaunchConnection {
    cursor: String!
    hasMore: Boolean!
    launches: [Launch]!
  }
  type Mutation {
    bookTrips(launchIds: [ID]!): TripUpdateResponse!
    cancelTrip(launchId: ID!): TripUpdateResponse!
    login(email: String): User
  }
`;
