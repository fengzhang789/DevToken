import "reflect-metadata";
import 'dotenv/config'

import path from "path";
import { fileURLToPath } from 'url';

import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { buildSchema } from "type-graphql";
import AuthResolver from "./resolvers/auth/index.js";
import RepoResolver from "./resolvers/repos/index.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const main: () => Promise<void> = async () => {
  const schema = await buildSchema({
    resolvers: [AuthResolver, RepoResolver],
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
