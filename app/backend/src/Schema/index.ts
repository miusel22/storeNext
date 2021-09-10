import { GraphQLObjectType, GraphQLSchema } from "graphql";
import { CREATE_PRODUCT, DELETE_PRODUCT ,UPDATE_PRODUCT} from "./Mutations/Product";
import { GET_ALL_PRODUCT } from './Queries/Product';

const RootQuery = new GraphQLObjectType({
    name:"RootQuery",
    fields: {
        getAllProducts : GET_ALL_PRODUCT
    }
});

const Mutation = new GraphQLObjectType({
    name: "Mutation",
    fields:{
    createProduct:CREATE_PRODUCT,
    deleteProduct: DELETE_PRODUCT,
    updateProduct:UPDATE_PRODUCT
    }

});
export const schema = new GraphQLSchema({
    query: RootQuery,
    mutation:Mutation
});