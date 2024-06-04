/**
 * @file [...nextauth].js
 * @description Configuration for NextAuth.js to handle authentication using credentials (email and password).
 */

import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import connectToDatabase from "../../../lib/mongodb";
import User from "../../../models/user";
import bcrypt from "bcryptjs";

export default NextAuth({
  /**
   * @description Array of authentication providers. Here, using a credentials provider for email/password authentication.
   */
  providers: [
    CredentialsProvider({
      name: "Credentials", // Name of the credentials provider displayed on the login form.
      credentials: {
        email: { label: "Email", type: "email" },  // Configuration for the email field.
        password: { label: "Password", type: "password" },  // Configuration for the password field.
      },
      /**
       * @async
       * @function authorize
       * @description Function to validate the user credentials.
       * @param {Object} credentials - User credentials (email and password) submitted during login.
       * @returns {Object|null} - Returns user object if credentials are valid, otherwise returns null.
       */
      async authorize(credentials) {
        await connectToDatabase(); // Connect to the MongoDB database.

        // Find the user in the database with the given email.
        const user = await User.findOne({ email: credentials.email });

        // If user exists and password matches, return user details.
        if (user && bcrypt.compareSync(credentials.password, user.password)) {
          return { id: user._id, email: user.email };
        }

        // If authentication fails, return null.
        return null;
      },
    }),
  ],
  session: {
    jwt: true, // Use JSON Web Tokens for session management.
  },
  callbacks: {
    /**
     * @async
     * @function jwt
     * @description Callback to handle JWT creation and updates.
     * @param {Object} token - The JWT token.
     * @param {Object} user - The authenticated user object.
     * @returns {Object} - The modified token.
     */
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id; // Add user ID to the token.
      }
      return token; // Return the token.
    },
    /**
     * @async
     * @function session
     * @description Callback to handle session creation.
     * @param {Object} session - The session object.
     * @param {Object} token - The JWT token.
     * @returns {Object} - The modified session.
     */
    async session({ session, token }) {
      session.user.id = token.id; // Add user ID to the session.
      return session; // Return the session.
    },
  },
  pages: {
    signIn: "/login", // Define the sign-in page route.
  },
});
