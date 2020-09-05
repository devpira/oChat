const { ApolloServer } = require('apollo-server');
const { typeDefs } = require('./schema');
const { resolvers } = require('./resolvers');

const { initializeMongodb } = require('./mongodb')


const server = new ApolloServer({typeDefs, resolvers});

const startServer = () => server.listen().then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
});

initializeMongodb(startServer);
