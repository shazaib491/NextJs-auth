import mongoose from "mongoose";

// Retrieve the MongoDB URI from environment variables
const MONGODB_URI = process.env.MONGODB_URI;

// Check if the MongoDB URI is defined, if not throw an error
if (!MONGODB_URI) {
  throw new Error(
    "Please define the MONGODB_URI environment variable inside .env.local"
  );
}

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections growing exponentially
 * during API Route usage.
 */
let cached = global.mongoose;

// If there is no cached connection, create an empty cache object
if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

/**
 * Function to connect to the MongoDB database.
 * This function uses a cached connection in development to prevent
 * creating new connections on every hot reload.
 * 
 * @returns {Promise<mongoose.Connection>} The mongoose connection object
 */
async function connectToDatabase() {
  // If there is an existing cached connection, return it
  if (cached.conn) {
    return cached.conn;
  }

  // If there is no cached promise for connection, create a new one
  if (!cached.promise) {
    const opts = {
      useNewUrlParser: true,      // Use the new URL string parser
      useUnifiedTopology: true,   // Use the new Server Discover and Monitoring engine
      bufferCommands: false,      // Disable mongoose buffering for commands
    };

    // Create a new connection promise and store it in the cache
    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      return mongoose;
    });
  }

  // Wait for the connection promise to resolve and store the connection in the cache
  cached.conn = await cached.promise;
  return cached.conn;
}

export default connectToDatabase;
