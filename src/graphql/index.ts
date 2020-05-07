import { ApolloServer } from 'apollo-server-koa';
import { homeResolver } from './resolvers/home';
import { buildSchema } from 'type-graphql';

import * as Koa from 'koa';

export async function integrateGraphql(app: Koa<Koa.DefaultContext, Koa.DefaultState>) {
  const server = new ApolloServer({
    schema: await buildSchema({
      resolvers: [homeResolver],
    }),
    playground: {
      settings: {
          'request.credentials': 'include'
      }
  } as any,
    introspection: true,
    context: ({ ctx }) => ctx
  });
  server.applyMiddleware({ app });
  return server;
}