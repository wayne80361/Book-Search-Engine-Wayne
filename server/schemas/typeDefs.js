const typeDefs = `
type User {
    _id: ID!
    username: String!
    email: String!
    savedBooks: [Book]
    bookCount: Int
}

type Book {
        authors: [String]
        description: String!
        bookId: String!
        image: String
        link: String
        title: String!
}

input saveBook {
    authors: [String]
    description: String!
    bookId: String!
    image: String
    link: String
    title: String!
}

type Auth {
    token: ID!
    user: User
}

type Query {
    me(id: ID!): User
}

type Mutation {
    addUser(username: String!, email: String!, password: String!): User
    login(email: String!, password: String! ): Auth
    saveBook(User: ID!, input: saveBook!): User
    removeBook(User: ID!, bookId: String!): User
}
`;

module.exports = typeDefs;
