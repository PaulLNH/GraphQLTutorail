const { GraphQLServer } = require('graphql-yoga');

let links = [{
    id: 'link-0',
    url: 'www.howtographql.com',
    description: 'Fullstack tutorial for GraphQL',
}];

let idCount = links.length;

// Implementation of the GraphQL schema
const resolvers = {
    Query: {
        info: () => `This is the API of a Hackernews Clone`,
        feed: () => links,
    },
    Mutation: {
        post: (parent, args) => {
            const link = {
                id: `link-${idCount++}`,
                description: args.description,
                url: args.url,
            }
            links.push(link);
            return link
        },
        updateLink: (parent, args) => {

        },
        deleteLink: (parent, args) => {

        },
    },
};

// Pass the schema and the resolvers into the GraphQL Server (imported from graphql-yoha)
const server = new GraphQLServer({
    typeDefs: './src/schema.graphql',
    resolvers,
});

server.start(() => console.log(`Server is running on http://localhost:${server.options.port}`));

/**
 * Your Prisma GraphQL database endpoint is live:
 * HTTP:  https://us1.prisma.sh/plaird83-81ea8c/GraphQLTutorail/dev
 * WS:    wss://us1.prisma.sh/plaird83-81ea8c/GraphQLTutorail/dev
 */
