import { useSession } from 'next-auth/react';

const useAuth = () => {
  const { data: session, status } = useSession();
  return { session, status };
};

export default useAuth;
