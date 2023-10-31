const express = require("express");
const path = require("path");
const db = require("./config/connection");
// const routes = require("./routes");

// bring in Apollo and its Express middleware
const { ApolloServer } = require("@apollo/server");
const { expressMiddleware } = require("@apollo/server/express4");
// bring in GraphQL schemas
const { typeDefs, resolvers } = require("./schemas");
// bring in auth middleware
const { authMiddleware } = require("./utils/auth");

const app = express();
const PORT = process.env.PORT || 3001;

// apollo server
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

// Create a new instance of an Apollo server with the GraphQL schema
const startApolloServer = async () => {
  await server.start();

  // Configure Express to parse incoming URL-encoded and JSON data.
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());

  //middleware for graphql
  app.use(
    "/graphql",
    expressMiddleware(server, {
      // bring in auth middleware
      context: authMiddleware,
    })
  );

  // if we're in production, serve client/dist as static assets
  if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../client/dist")));
    app.get("*", (req, res) => {
      res.sendFile(path.join(__dirname, "../client/dist/index.html"));
    });
  }

  // app.use(routes);

  db.once("open", () => {
    app.listen(PORT, () => {
      console.log(`🌍 Now listening on localhost:${PORT}`);
      console.log(`Use GraphQL at http://localhost:${PORT}/graphql`);
    });
  });
};

// Call the async function to start the server
startApolloServer();
