/**
 * Left off @ https://www.howtographql.com/graphql-js/6-authentication/
 * run search on this string:
 * 'Testing the authentication flow'
 */



const { GraphQLServer } = require('graphql-yoga');
const { prisma } = require('./generated/prisma-client');
const Query = require('./resolvers/Query');
const Mutation = require('./resolvers/Mutation');
const User = require('./resolvers/User');
const Link = require('./resolvers/Link');

// let links = [{
//     id: 'link-0',
//     url: 'www.howtographql.com',
//     description: 'Fullstack tutorial for GraphQL',
// }];

// let idCount = links.length;

// Implementation of the GraphQL schema
const resolvers = {
    Query,
    Mutation,
    User,
    Link
};

// Pass the schema and the resolvers into the GraphQL Server (imported from graphql-yoha)
const server = new GraphQLServer({
    typeDefs: './src/schema.graphql',
    resolvers,
    context: request => {
        return {
            ...request,
            prisma,
        }
    },
});

server.start(() => console.log(`Server is running on http://localhost:${server.options.port}`));

/**
 * Your Prisma GraphQL database endpoint is live:
 * HTTP:  https://us1.prisma.sh/plaird83-81ea8c/GraphQLTutorail/dev
 * WS:    wss://us1.prisma.sh/plaird83-81ea8c/GraphQLTutorail/dev
 */