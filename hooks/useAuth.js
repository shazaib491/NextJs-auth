import { useSession } from 'next-auth/react';

/**
 * Custom hook to get the current authentication session and status.
 *
 * This hook leverages NextAuth's useSession hook to retrieve the session data
 * and the authentication status of the user. It can be used throughout your
 * application to determine if a user is logged in and to access user-specific
 * information stored in the session.
 *
 * @returns {Object} - An object containing the session data and the status of the session.
 *                     The session object includes user details if the user is authenticated.
 *                     The status can be 'loading', 'authenticated', or 'unauthenticated'.
 */
const useAuth = () => {
  // Destructure the session data and status from the useSession hook
  const { data: session, status } = useSession();

  // Return the session data and status
  return { session, status };
};

export default useAuth;
