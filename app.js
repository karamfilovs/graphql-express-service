const express = require('express');
const app = express();
const { ApolloServer, gql } = require('apollo-server-express');
const { userInfo } = require('os');
let users = require('./data').users;
let cars = require('./data').cars;


//Define type defs
const typeDefs = gql`
type Query {
    me: User
    user(id: Int!): User
    users: [User]
    cars: [Car]
}

type User {
    id: Int!
    name: String!
    age: Int!
}

type Car {
    id: Int!
    make: String!
    year: String!
}

type Mutation {
    makeUser(id: Int!, name: String!): User!
    removeUser(id: Int!): Boolean!
}
`;

//Define resolvers
const resolvers = {
    //Query resolver
    Query: {
        //User resolvers
        me: () => users[0], //return me if 
        users: () => users, //return all users
        user: (parent, { id }) => users[id - 1], //return user id - 1 to get the right user

        //Car resolvers
        cars: () => cars,
    },

    //Mutation resolver
    Mutation: {
        //make user mutation
        makeUser: (parent, { id, name }) => {
            //The user 
            const user = {
                id,
                name
            };
            //Adding the user to the array of fake users
            users.push(user);
            return user;
        },
        removeUser: (parent, { id }) => {
            const initialCount = users.length
            users = users.filter(user => user.id === id)
            return initialCount != users.length
        }
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
