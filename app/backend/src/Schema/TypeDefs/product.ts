import {GraphQLObjectType, GraphQLID,GraphQLString} from 'graphql';

export const UserType = new GraphQLObjectType({
    name: "Product",
    fields: () => ({
      id: {type: GraphQLID},
      name: {type:GraphQLString},
      stock: {type:GraphQLString},
      description: {type:GraphQLString},
      category: {type:GraphQLString},
      price:{type:GraphQLString}
    }),
  });