import 'reflect-metadata';
import { createConnection } from 'typeorm';
import { ApolloServer } from 'apollo-server';
import { buildSchema } from 'type-graphql';
import { ApolloServerPluginLandingPageGraphQLPlayground } from 'apollo-server-core';
import 'dotenv/config';

import {
  StateResolver,
  EventResolver,
  NodeResolver,
  VectorSlotResolver,
  VersionResolver
} from './resolvers/';
import { DateScalar } from './scalars';

const main = async () => {
  const host = process.env.DB_URL;
  const password = process.env.DB_PASS;
  const port = process.env.DB_PORT;
  const database = process.env.DB_NAME;
  const username = process.env.DB_USER;

  if (
    password !== undefined &&
    port !== undefined &&
    database !== undefined &&
    host !== undefined &&
    username !== undefined
  ) {
    await createConnection({
      password,
      port: Number(port),
      database,
      host,
      username,
      type: 'mysql',
      entities: ['src/models/*.ts'],
      synchronize: false,
      timezone: 'Z'
    });
  } else {
    throw new Error(
      'Could not connect to database, please make sure DB_PASS, DB_PORT, DB_NAME, DB_URL, and DB_USER are defined in your environment'
    );
  }

  const schema = await buildSchema({
    resolvers: [StateResolver, EventResolver, NodeResolver, VectorSlotResolver, VersionResolver],
    scalarsMap: [
      {
        type: Date,
        scalar: DateScalar
      }
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
      ApolloServerPluginLandingPageGraphQLPlayground({
        settings: {
          'request.credentials': 'include'
        }
      })
    ],
    schema
  });

  await server.listen(4001);

  console.log('Server has started!');
};

void main();
