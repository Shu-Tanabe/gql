import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
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
  description: Scalars['String'];
  introducerId: Scalars['String'];
  occasion: Occusion;
  restaurantName: Scalars['String'];
  score: Scalars['Float'];
};

export type EnteredRestaurant = {
  __typename?: 'EnteredRestaurant';
  description: Scalars['String'];
  introducerId: Scalars['String'];
  occasion: Occusion;
  restaurantId: Scalars['ID'];
  restaurantName: Scalars['String'];
  score: Scalars['Float'];
  updateDate: Scalars['Date'];
};

export type GqlRestaurant = {
  __typename?: 'GqlRestaurant';
  description: Scalars['String'];
  introducer: GqlUser;
  occasion: Occusion;
  restaurantId: Scalars['ID'];
  restaurantName: Scalars['String'];
  score: Scalars['Float'];
  updateDate: Scalars['Date'];
};

export type GqlUser = {
  __typename?: 'GqlUser';
  mail: Scalars['String'];
  password: Scalars['String'];
  userId: Scalars['ID'];
  userName: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  addRestaurant: EnteredRestaurant;
  deleteRestaurant: Status;
  updateRestaurant: EnteredRestaurant;
};


export type MutationAddRestaurantArgs = {
  restaurantInput: AddRestaurantInput;
};


export type MutationDeleteRestaurantArgs = {
  restaurantId: Scalars['String'];
};


export type MutationUpdateRestaurantArgs = {
  restaurantId: Scalars['ID'];
  restaurantUpdate?: InputMaybe<UpdateRestaurantInput>;
};

export type Occusion =
  | 'Alone'
  | 'Colleague'
  | 'Dating'
  | 'Friends';

export type Query = {
  __typename?: 'Query';
  getRestaurantById: GqlRestaurant;
  getRestaurants?: Maybe<Array<GqlRestaurant>>;
};


export type QueryGetRestaurantByIdArgs = {
  restaurantId: Scalars['String'];
};

export type Restaurant = {
  __typename?: 'Restaurant';
  description?: Maybe<Scalars['String']>;
  introducer?: Maybe<Scalars['String']>;
  occasion: Occusion;
  restaurantId: Scalars['ID'];
  restaurantName: Scalars['String'];
  score?: Maybe<Scalars['Float']>;
  updatedDate?: Maybe<Scalars['Date']>;
};

export type Status =
  | 'BAD_GATEWAY'
  | 'BAD_REQUEST'
  | 'CREATED'
  | 'FORBIDDEN'
  | 'GATEWAY_TIMEOUT'
  | 'INTERNAL_SERVER_ERROR'
  | 'NOT_FOUND'
  | 'NO_CONTENT'
  | 'OK'
  | 'SURVICE_UNAVAILABLE'
  | 'UNAUTHORIZED';

export type UpdateRestaurantInput = {
  description: Scalars['String'];
  occasion: Occusion;
  restaurantName: Scalars['String'];
  score: Scalars['Float'];
};

export type WithIndex<TObject> = TObject & Record<string, any>;
export type ResolversObject<TObject> = WithIndex<TObject>;

export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

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

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = ResolversObject<{
  AddRestaurantInput: AddRestaurantInput;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  Date: ResolverTypeWrapper<Scalars['Date']>;
  EnteredRestaurant: ResolverTypeWrapper<EnteredRestaurant>;
  Float: ResolverTypeWrapper<Scalars['Float']>;
  GqlRestaurant: ResolverTypeWrapper<GqlRestaurant>;
  GqlUser: ResolverTypeWrapper<GqlUser>;
  ID: ResolverTypeWrapper<Scalars['ID']>;
  Mutation: ResolverTypeWrapper<{}>;
  Occusion: Occusion;
  Query: ResolverTypeWrapper<{}>;
  Restaurant: ResolverTypeWrapper<Restaurant>;
  Status: Status;
  String: ResolverTypeWrapper<Scalars['String']>;
  UpdateRestaurantInput: UpdateRestaurantInput;
}>;

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  AddRestaurantInput: AddRestaurantInput;
  Boolean: Scalars['Boolean'];
  Date: Scalars['Date'];
  EnteredRestaurant: EnteredRestaurant;
  Float: Scalars['Float'];
  GqlRestaurant: GqlRestaurant;
  GqlUser: GqlUser;
  ID: Scalars['ID'];
  Mutation: {};
  Query: {};
  Restaurant: Restaurant;
  String: Scalars['String'];
  UpdateRestaurantInput: UpdateRestaurantInput;
}>;

export interface DateScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Date'], any> {
  name: 'Date';
}

export type EnteredRestaurantResolvers<ContextType = ../context, ParentType extends ResolversParentTypes['EnteredRestaurant'] = ResolversParentTypes['EnteredRestaurant']> = ResolversObject<{
  description?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  introducerId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  occasion?: Resolver<ResolversTypes['Occusion'], ParentType, ContextType>;
  restaurantId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  restaurantName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  score?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  updateDate?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type GqlRestaurantResolvers<ContextType = ../context, ParentType extends ResolversParentTypes['GqlRestaurant'] = ResolversParentTypes['GqlRestaurant']> = ResolversObject<{
  description?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  introducer?: Resolver<ResolversTypes['GqlUser'], ParentType, ContextType>;
  occasion?: Resolver<ResolversTypes['Occusion'], ParentType, ContextType>;
  restaurantId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  restaurantName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  score?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  updateDate?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type GqlUserResolvers<ContextType = ../context, ParentType extends ResolversParentTypes['GqlUser'] = ResolversParentTypes['GqlUser']> = ResolversObject<{
  mail?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  password?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  userId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  userName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type MutationResolvers<ContextType = ../context, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = ResolversObject<{
  addRestaurant?: Resolver<ResolversTypes['EnteredRestaurant'], ParentType, ContextType, RequireFields<MutationAddRestaurantArgs, 'restaurantInput'>>;
  deleteRestaurant?: Resolver<ResolversTypes['Status'], ParentType, ContextType, RequireFields<MutationDeleteRestaurantArgs, 'restaurantId'>>;
  updateRestaurant?: Resolver<ResolversTypes['EnteredRestaurant'], ParentType, ContextType, RequireFields<MutationUpdateRestaurantArgs, 'restaurantId'>>;
}>;

export type QueryResolvers<ContextType = ../context, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = ResolversObject<{
  getRestaurantById?: Resolver<ResolversTypes['GqlRestaurant'], ParentType, ContextType, RequireFields<QueryGetRestaurantByIdArgs, 'restaurantId'>>;
  getRestaurants?: Resolver<Maybe<Array<ResolversTypes['GqlRestaurant']>>, ParentType, ContextType>;
}>;

export type RestaurantResolvers<ContextType = ../context, ParentType extends ResolversParentTypes['Restaurant'] = ResolversParentTypes['Restaurant']> = ResolversObject<{
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  introducer?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  occasion?: Resolver<ResolversTypes['Occusion'], ParentType, ContextType>;
  restaurantId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  restaurantName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  score?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  updatedDate?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type Resolvers<ContextType = ../context> = ResolversObject<{
  Date?: GraphQLScalarType;
  EnteredRestaurant?: EnteredRestaurantResolvers<ContextType>;
  GqlRestaurant?: GqlRestaurantResolvers<ContextType>;
  GqlUser?: GqlUserResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Restaurant?: RestaurantResolvers<ContextType>;
}>;

