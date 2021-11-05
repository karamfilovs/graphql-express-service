const express = require('express');
const app = express();
const { ApolloServer, gql } = require('apollo-server-express');
const { userInfo } = require('os');
const users = require('./data').users;

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

}

`;

const resolvers = {
    Query: {
        me: () => {
            return {
                name: 'Alex'
            }
        },
        users: () => users
    }
};


const server = new ApolloServer({
    typeDefs,
    resolvers
});

server.start().then(res => {
    server.applyMiddleware({ app });
});
app.listen(3000, () => console.log('Apollo GraphQL server is running on port 3000'));
