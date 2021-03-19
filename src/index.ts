import 'reflect-metadata';
import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';

import { MathResolver } from './resolvers/math';

(async () => {
    const app = express();
    const apolloServer = new ApolloServer({
        schema: await buildSchema({
            resolvers: [MathResolver],
            validate: false,
        }),
    });
    apolloServer.applyMiddleware({ app });
    app.listen('3001', () => {
        console.log(`Apollo graphql server started on http://localhost:3001${apolloServer.graphqlPath}`);
    });
})();
