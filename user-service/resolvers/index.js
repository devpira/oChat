const { createUser } = require('./user');

const resolvers = {
    // Query: {
        
    // },
    Mutation: {
        createUser
    }
};

module.exports = {
    resolvers
}
