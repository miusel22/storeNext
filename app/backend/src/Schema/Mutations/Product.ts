import { UserType } from "../TypeDefs/product";
import { GraphQLID, GraphQLList, GraphQLString } from "graphql";
import { Products } from "../../Entities/Products";
import { MessageType } from "../TypeDefs/Messages";

export const CREATE_PRODUCT = {
  type: UserType,
  args: {
    name: {type:GraphQLString},
    stock: {type:GraphQLString},
    description: {type:GraphQLString},
    category: {type:GraphQLString},
    price:{type:GraphQLString}
  },
  async resolve(parent: any, args: any) {
    const { name,stock,description,category,price  } = args;
    await Products.insert({ name,stock,description,category,price });
    return { args }
  },
};

export const DELETE_PRODUCT = {
  type: MessageType,
  args: {
    id: { type: GraphQLID },
  },
  async resolve(parent: any, args: any) {
    const id = args.id;
    await Products.delete(id);

    return { successful: true, message: "DELETE WORKED" };
  },
};



export const UPDATE_PRODUCT = {
  type: MessageType,
  args: {
    id: { type: GraphQLID },
    name: {type:GraphQLString},
    stock: {type:GraphQLString},
    description: {type:GraphQLString},
    category: {type:GraphQLString},
    price:{type:GraphQLString}
  },
  async resolve(parent: any, args: any) {
    const { id,  name, stock,description,category,price } = args;
    const product = await Products.findOne({ id: id });

    if (!product) {
      throw new Error("PRODUCT DOESNT EXIST");
    }

   
      await Products.update({ id:id }, { name, stock,description,category,price});

      return { successful: true, message: "PRODUCT UPDATE" };
  
  },
};