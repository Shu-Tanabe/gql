import {
  GraphQLResolveInfo,
  GraphQLScalarType,
  GraphQLScalarTypeConfig,
} from "graphql";
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
export type RequireFields<T, K extends keyof T> = Omit<T, K> & {
  [P in K]-?: NonNullable<T[P]>;
};
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Date: any;
};

export type AddRestaurantInput = {
  description?: InputMaybe<Scalars["String"]>;
  introducer?: InputMaybe<Scalars["String"]>;
  restaurantName: Scalars["String"];
  score?: InputMaybe<Scalars["Float"]>;
};

export type Mutation = {
  __typename?: "Mutation";
  addRestaurant?: Maybe<Restaurant>;
  deleteRestaurant: Status;
  updateRestaurant?: Maybe<Restaurant>;
};

export type MutationAddRestaurantArgs = {
  restaurantInput?: InputMaybe<AddRestaurantInput>;
};

export type MutationDeleteRestaurantArgs = {
  restaurantId: Scalars["String"];
};

export type MutationUpdateRestaurantArgs = {
  restaurantId: Scalars["String"];
  restaurantUpdate?: InputMaybe<UpdateRestaurantInput>;
};

export type Query = {
  __typename?: "Query";
  getRestaurantById?: Maybe<Restaurant>;
  getRestaurants?: Maybe<Array<Maybe<Restaurant>>>;
};

export type QueryGetRestaurantByIdArgs = {
  restaurantId: Scalars["String"];
};

export type Restaurant = {
  __typename?: "Restaurant";
  description?: Maybe<Scalars["String"]>;
  introducer?: Maybe<Scalars["String"]>;
  restaurantId: Scalars["ID"];
  restaurantName: Scalars["String"];
  score?: Maybe<Scalars["Float"]>;
  updatedDate?: Maybe<Scalars["Date"]>;
};

export type Status =
  | "BAD_GATEWAY"
  | "BAD_REQUEST"
  | "CREATED"
  | "FORBIDDEN"
  | "GATEWAY_TIMEOUT"
  | "INTERNAL_SERVER_ERROR"
  | "NOT_FOUND"
  | "NO_CONTENT"
  | "OK"
  | "SURVICE_UNAVAILABLE"
  | "UNAUTHORIZED";

export type UpdateRestaurantInput = {
  description?: InputMaybe<Scalars["String"]>;
  restaurantName: Scalars["String"];
  score?: InputMaybe<Scalars["Float"]>;
};

export type WithIndex<TObject> = TObject & Record<string, any>;
export type ResolversObject<TObject> = WithIndex<TObject>;

export type ResolverTypeWrapper<T> = Promise<T> | T;

export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<
  TResult,
  TKey extends string,
  TParent,
  TContext,
  TArgs
> {
  subscribe: SubscriptionSubscribeFn<
    { [key in TKey]: TResult },
    TParent,
    TContext,
    TArgs
  >;
  resolve?: SubscriptionResolveFn<
    TResult,
    { [key in TKey]: TResult },
    TContext,
    TArgs
  >;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<
  TResult,
  TKey extends string,
  TParent,
  TContext,
  TArgs
> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<
  TResult,
  TKey extends string,
  TParent = {},
  TContext = {},
  TArgs = {}
> =
  | ((
      ...args: any[]
    ) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (
  obj: T,
  context: TContext,
  info: GraphQLResolveInfo
) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<
  TResult = {},
  TParent = {},
  TContext = {},
  TArgs = {}
> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = ResolversObject<{
  AddRestaurantInput: AddRestaurantInput;
  Boolean: ResolverTypeWrapper<Scalars["Boolean"]>;
  Date: ResolverTypeWrapper<Scalars["Date"]>;
  Float: ResolverTypeWrapper<Scalars["Float"]>;
  ID: ResolverTypeWrapper<Scalars["ID"]>;
  Mutation: ResolverTypeWrapper<{}>;
  Query: ResolverTypeWrapper<{}>;
  Restaurant: ResolverTypeWrapper<Restaurant>;
  Status: Status;
  String: ResolverTypeWrapper<Scalars["String"]>;
  UpdateRestaurantInput: UpdateRestaurantInput;
}>;

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  AddRestaurantInput: AddRestaurantInput;
  Boolean: Scalars["Boolean"];
  Date: Scalars["Date"];
  Float: Scalars["Float"];
  ID: Scalars["ID"];
  Mutation: {};
  Query: {};
  Restaurant: Restaurant;
  String: Scalars["String"];
  UpdateRestaurantInput: UpdateRestaurantInput;
}>;

export interface DateScalarConfig
  extends GraphQLScalarTypeConfig<ResolversTypes["Date"], any> {
  name: "Date";
}

export type MutationResolvers<
  ContextType = "../context",
  ParentType extends ResolversParentTypes["Mutation"] = ResolversParentTypes["Mutation"]
> = ResolversObject<{
  addRestaurant?: Resolver<
    Maybe<ResolversTypes["Restaurant"]>,
    ParentType,
    ContextType,
    Partial<MutationAddRestaurantArgs>
  >;
  deleteRestaurant?: Resolver<
    ResolversTypes["Status"],
    ParentType,
    ContextType,
    RequireFields<MutationDeleteRestaurantArgs, "restaurantId">
  >;
  updateRestaurant?: Resolver<
    Maybe<ResolversTypes["Restaurant"]>,
    ParentType,
    ContextType,
    RequireFields<MutationUpdateRestaurantArgs, "restaurantId">
  >;
}>;

export type QueryResolvers<
  ContextType = "../context",
  ParentType extends ResolversParentTypes["Query"] = ResolversParentTypes["Query"]
> = ResolversObject<{
  getRestaurantById?: Resolver<
    Maybe<ResolversTypes["Restaurant"]>,
    ParentType,
    ContextType,
    RequireFields<QueryGetRestaurantByIdArgs, "restaurantId">
  >;
  getRestaurants?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["Restaurant"]>>>,
    ParentType,
    ContextType
  >;
}>;

export type RestaurantResolvers<
  ContextType = "../context",
  ParentType extends ResolversParentTypes["Restaurant"] = ResolversParentTypes["Restaurant"]
> = ResolversObject<{
  description?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  introducer?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  restaurantId?: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
  restaurantName?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  score?: Resolver<Maybe<ResolversTypes["Float"]>, ParentType, ContextType>;
  updatedDate?: Resolver<
    Maybe<ResolversTypes["Date"]>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type Resolvers<ContextType = "../context"> = ResolversObject<{
  Date?: GraphQLScalarType;
  Mutation?: MutationResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Restaurant?: RestaurantResolvers<ContextType>;
}>;
