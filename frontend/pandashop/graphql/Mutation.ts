import { gql } from "@apollo/client";

export const CREATE_PRODUCT = gql`
  mutation createProduct($name: String!, $stock: String!,$description: String!, $category: String!,$price: String!) {
    createProduct(name: $name, stock: $stock, description: $description, category: $category, price: $price) {
      name
      stock
      description
      category
      price
    }
  }
`;
export const DELETE_PRODUCT = gql`
  mutation deleteProduct($id: ID!) {
    deleteProduct(id: $id) {
      message
    }
  }
`;

export const UPDATE_PRODUCT = gql`
  mutation updateProduct($id:ID!,$name:String!, $stock:String!,$description:String!, $category:String!,$price:String!) {
    updateProduct(
    id: $id, 
    name: $name, 
    stock: $stock, 
    description: $description, 
    category: $category, 
    price: $price) 
    {
      message
    }
  }
`;