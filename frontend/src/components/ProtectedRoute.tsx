import { useAuth } from '../hooks/auth';
import { ReactNode, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface ProtectedLayoutProps {
  children: ReactNode;
}

export default function ProtectedLayout({ children }: ProtectedLayoutProps) {
  const navigate = useNavigate();

  // 1. Load the authenticated user
  const { isAuthenticated, user } = useAuth({});

  // 2. If there is NO authenticated user, redirect to the /login
  useEffect(
    function () {
      if (!isAuthenticated && user && !user.isLoading) {
        // Add a null check for the 'user' object
        navigate('/login');
      }
    },
    [isAuthenticated, user, navigate], // Include 'user' in the dependencies array
  );

  // 3. While loading, show a spinner
  if (user && user.isLoading) return <p>Loading...</p>; // Add a null check for 'user'

  // 4. If there IS a user, render the app
  if (isAuthenticated) return children;

  // 5. If there is no authenticated user and not loading, you can render a message or redirect to the login page.
  // For example:
  return <p>You need to log in to access this page.</p>;
}
