/**
 * @file register.js
 * @description API endpoint for handling user registration. This endpoint allows new users to register by providing their email and password. The password is hashed before being stored in the database.
 */

import { hash } from 'bcrypt';
import connectToDatabase from '../../../lib/mongodb';
import User from '../../../models/user';

/**
 * @async
 * @function handler
 * @description Handles the HTTP request for user registration.
 * @param {Object} req - The HTTP request object.
 * @param {Object} res - The HTTP response object.
 * @returns {Object} - The HTTP response with status and message.
 */
export default async function handler(req, res) {
  // Only allow POST method for this endpoint
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    // Connect to the database
    await connectToDatabase();

    // Parse the request body to extract email and password
    const { email, password } = JSON.parse(req.body);

    // Validate that both email and password are provided
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    // Check if the user already exists in the database
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash the password for secure storage
    const hashedPassword = await hash(password, 10);

    // Create a new user with the hashed password
    const newUser = new User({ email, password: hashedPassword });
    await newUser.save();

    // Respond with success message
    return res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    // Log the error and respond with a server error message
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}
