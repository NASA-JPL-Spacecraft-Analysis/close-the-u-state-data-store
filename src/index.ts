import 'reflect-metadata';

import { createConnection } from 'typeorm';
import { ApolloServer } from 'apollo-server';
import { buildSchema } from 'type-graphql';
import { ApolloServerPluginLandingPageGraphQLPlayground } from 'apollo-server-core';

import {
  DataResolver,
  EventResolver,
  NodeResolver,
  VectorSlotResolver,
  VersionResolver
} from './resolvers/';
import { DateScalar } from './scalars';

const main = async () => {
  await createConnection();

  const schema = await buildSchema({
    resolvers: [
      DataResolver,
      EventResolver,
      NodeResolver,
      VectorSlotResolver,
      VersionResolver
    ],
    scalarsMap: [{
      type: Date,
      scalar: DateScalar
    }],
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
      ApolloServerPluginLandingPageGraphQLPlayground({
        settings: {
          'request.credentials': 'include'
        }
      })
    ],
    schema,
  });

  await server.listen(4000);

  console.log('Server has started!');
};

void main();
