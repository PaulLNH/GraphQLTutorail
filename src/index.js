/**
 * Left off @ https://www.howtographql.com/graphql-js/6-authentication/
 * run search on this string:
 * 'Two things have changed in the implementation compared to the previous implementation in'
 */



const { GraphQLServer } = require('graphql-yoga');
const { prisma } = require('./generated/prisma-client');

// let links = [{
//     id: 'link-0',
//     url: 'www.howtographql.com',
//     description: 'Fullstack tutorial for GraphQL',
// }];

// let idCount = links.length;

// Implementation of the GraphQL schema
const resolvers = {
    Query: {
        info: () => `This is the API of a Hackernews Clone`,
        // Feed accesses the prisma client and acts as a medium to access the database and perform CRUD operations for your models
        feed: (root, args, context, info) => {
            return context.prisma.links()
        },
    },
    Mutation: {
        // Invoking a function on the prisma client which is attached to context
        post: (root, args, context) => {
            return context.prisma.createLink({
                url: args.url,
                description: args.description,
            })
        },
    },
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
