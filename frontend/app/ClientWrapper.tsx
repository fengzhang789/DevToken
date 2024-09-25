"use client";

import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import React from "react";
import UserInformationProvider from "./__shared/contexts/UserInformationContext";

const client = new ApolloClient({
  uri: process.env.NEXT_PUBLIC_BACKEND_URI,
  cache: new InMemoryCache(),
});

type Props = {
  children: React.ReactNode;
};

const ClientWrapper = ({ children }: Props) => {
  return (
    <ApolloProvider client={client}>
      <UserInformationProvider>{children}</UserInformationProvider>
    </ApolloProvider>
  );
};

export default ClientWrapper;
