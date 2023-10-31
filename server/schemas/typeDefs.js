const typeDefs = `
type User {
    _id: ID!
    username: String!
    email: String!
    password: String!
    savedBooks: [Book]
    bookCount: Int
}

type Book {
        _id: ID!
        authors: [String]
        description: String!
        bookId: String!
        image: String
        title: Sting!
}

type Auth {
    token: ID!
    user: User
}

type Query {
    user(id: ID!): User
}

type Mutation {
addSingleUser(username: String!, email: String!, password: String!): User
login(username: String, email: String, password: String! ): Auth
saveBook(User: ID!, authors: [String], description: String!, bookId: String!, image: String, title: Sting!): User
deleteBook(User: ID!, bookId: String!): User
}

}
`;

module.exports = typeDefs;
