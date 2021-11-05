const express = require('express');
const app = express();
const { ApolloServer, gql } = require('apollo-server-express');
const { userInfo } = require('os');
const users = require('./data').users;

//Define type defs
const typeDefs = gql`
type Query {
    me: User
    user(id: Int!): User
    users: [User]
}

type User {
    id: Int!
    name: String!
    age: Int!
}`;

//Define resolvers
const resolvers = {
    Query: {
        me: () => users[0], //return me if 
        users: () => users, //return all users
        user: (parent, { id }) => users[id - 1] //return user id - 1 to get the right user
    }
};

//Specifying the typeDefs and resolver map for the appolo server
const server = new ApolloServer({
    typeDefs,
    resolvers
});

//Starting server in async fashion
server.start().then(res => {
    server.applyMiddleware({ app });
});
//Starting listening on port 3000
app.listen(3000, () => console.log('Apollo GraphQL server is running on port 3000'));
