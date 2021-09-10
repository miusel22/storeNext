import type { NextPage } from "next";
import { gql } from "@apollo/client";
import { client } from "./apollo-client";
import { useState } from "react";
// import { GET_ALL_PRODUCTS } from "../graphql/Queries";
import { useQuery, useMutation } from "@apollo/client";
import { Products } from "../components/Products";
import { ApolloClient, InMemoryCache } from "@apollo/client";
const [newData, setNewData] = useState("");

const Home: NextPage = ({ products }: any) => {
  return (
    <div>
      <Products products={products} />
    </div>
  );
};
export const GET_ALL_PRODUCTS = gql`
query {
  getAllProducts {
    id
    name
    stock
    description
    price
    category
  }
    }
  }

`;
export async function getStaticProps() {

  const { data, loading } = useQuery(GET_ALL_PRODUCTS,{
    fetchPolicy: "network-only" 
  });
  setNewData(data.getAllProducts)

  return {
    props: {
      products: newData,
      loading: loading,
    },
  };
}

export default Home;
