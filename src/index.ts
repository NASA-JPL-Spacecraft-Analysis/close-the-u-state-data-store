import 'reflect-metadata';
import { createConnection } from 'typeorm';
import { ApolloServer } from 'apollo-server';
import { buildSchema } from 'type-graphql';

import {
  DataResolver
} from './resolvers/';
import { ApolloServerPluginLandingPageGraphQLPlayground } from 'apollo-server-core';

const main = async () => {
  await createConnection();

  const schema = await buildSchema({
    resolvers: [
      DataResolver
    ],
    validate: false
  });

  const server = new ApolloServer({
    cors: {
      origin: (origin, callback) => {
        // Respond with the origin set to the caller.
        callback(null, true);
      },
      credentials: true
    },
    introspection: true,
    plugins: [
      ApolloServerPluginLandingPageGraphQLPlayground
    ],
    schema,
  });

  await server.listen(4000);

  console.log('Server has started!');
};

void main();
