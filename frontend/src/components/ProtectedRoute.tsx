import { useAuth } from '../hooks/auth';
import { ReactNode, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

interface ProtectedLayoutProps {
  children: ReactNode;
}

export default function ProtectedLayout({ children }: ProtectedLayoutProps) {
  const { isAuthenticated, user } = useAuth({});

  const navigate = useNavigate();
  // const location = useLocation();

  // const isLogInOrRegisterPage =
  //   location.pathname === '/log-in' || location.pathname === '/register';

  useEffect(() => {
    if (!isAuthenticated && !user.isLoading) {
      navigate('/log-in');
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user.isLoading, isAuthenticated]);

  if (user && user.isLoading) return <p>Loading...</p>;

  if (isAuthenticated) return children;

  return (
    <p>
      You need to log in to access this page. <Link to="/register">Register</Link>
    </p>
  );
}
