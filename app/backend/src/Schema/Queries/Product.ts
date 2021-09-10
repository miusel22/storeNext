import {UserType} from '../TypeDefs/product'
import { GraphQLList } from 'graphql'
import {Products} from '../../Entities/Products'

export const GET_ALL_PRODUCT = {
    type: new GraphQLList(UserType),
    resolve() {
      return Products.find();
    },
};

