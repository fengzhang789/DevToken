import "reflect-metadata";

import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { buildSchema } from "type-graphql";
import AuthResolver from "./resolvers/auth";
import path from "path";

const main: () => Promise<void> = async () => {
  const schema = await buildSchema({
    resolvers: [AuthResolver],
    emitSchemaFile: path.resolve(__dirname, "schema.graphql")
  })
  
  const server = new ApolloServer({
    schema,
  });
  
  const { url } = await startStandaloneServer(server, {
    listen: { port: 5000 },
  });

  console.log(`🚀  Server ready at: ${url}`);
}

main().catch((err) => console.error(err))
