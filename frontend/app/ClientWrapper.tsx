"use client";

import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import React from 'react'

const client = new ApolloClient({
  uri: process.env.NEXT_PUBLIC_BACKEND_URI,
  cache: new InMemoryCache(),
});

type Props = {
  children: React.ReactNode;
}


const ClientWrapper = ({ children }: Props) => {
  return (
    <ApolloProvider client={client}>
      {children}
    </ApolloProvider>
  )
}

export default ClientWrapper