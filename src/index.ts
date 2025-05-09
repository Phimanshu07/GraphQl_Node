import "reflect-metadata";
import { ApolloServer } from "apollo-server";
import { buildSchema } from "type-graphql";
import mongoose from "mongoose";
import { UserResolver } from "./resolvers/UserResolver";
import { ProductResolver } from "./resolvers/ProductResolver";

async function start() {
  await mongoose.connect("mongodb://localhost:27017/graphql_demo", {
    dbName: "graphql_demo",
  });

  const schema = await buildSchema({
    resolvers: [UserResolver, ProductResolver],
  });

  const server = new ApolloServer({ schema });

  const { url } = await server.listen({ port: 4000 });
  console.log(`🚀 Server ready at ${url}`);
}

start().catch((err) => console.error(err));
