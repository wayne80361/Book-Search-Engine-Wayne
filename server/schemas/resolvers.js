const { User } = require("../models");
const { AuthenticationError, signToken } = require("../utils/auth");

const resolvers = {
  Query: {
    me: async (parent, args) => {
      return await User.findById(args.id).populate("savedBooks");
    },
  },
  Mutation: {
    addUser: async (parent, { username, email, password }) => {
      const user = await User.create({ username, email, password });

      const token = signToken(user);
      return { token, user };
    },
    login: async (parent, { username, email, password }) => {
      const user = await User.findOne({ $or: [{ username }, { email }] });
      const correctPw = await user.isCorrectPassword(password);
      if (!correctPw) {
        throw AuthenticationError("Incorrect username or password");
      }
      const token = signToken(user);
      return { token, user };
    },
    saveBook: async (parent, { user, body }) => {
      const updatedUser = await User.findOneAndUpdate(
        { _id: user._id },
        { $addToSet: { savedBooks: body } },
        { new: true, runValidators: true }
      );
      if (!updatedUser) {
        throw new AuthenticationError("Couldn't add the book...");
      }
      return updatedUser;
    },
    removeBook: async (parent, { user, bookId }) => {
      const updatedUser = await User.findOneAndUpdate(
        { _id: user },
        { $pull: { savedBooks: { bookId } } },
        { new: true }
      );

      if (!updatedUser) {
        throw new AuthenticationError("Couldn't remove the book...");
      }
      return updatedUser;
    },
  },
};
