import type { NextPage } from "next";
import { gql } from "@apollo/client";
import {client} from "./apollo-client";
import { useState } from "react";
import { GET_ALL_PRODUCTS } from "../graphql/Queries";
import { useQuery, useMutation } from "@apollo/client";
import { Products } from "../components/Products";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { Spin } from "antd";
const Home: NextPage = ({ products, loading }: any) => {
  const client = new ApolloClient({
    uri: "http://localhost:4000/graphql",
    cache: new InMemoryCache(),
  });

  return (
    <div>
      <ApolloProvider client={client}>
        {loading ? <Spin tip="Loading..." /> : <Products products={products} />}
      </ApolloProvider>
    </div>
  );
};

export async function getStaticProps() {
  const { data, loading } = await client.query({
    query: gql`
      query {
        getAllProducts {
          id
          name
          stock
          description
          price
          category
        }, 
      },
    `,fetchPolicy: "no-cache" 
  });

  return {
    props: {
      products: data.getAllProducts,
      loading: loading,
    },
  };
}

export default Home;
