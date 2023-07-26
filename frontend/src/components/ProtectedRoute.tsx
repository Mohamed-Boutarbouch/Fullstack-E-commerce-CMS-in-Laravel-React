import { ReactNode, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { useAuth } from '@/hooks/auth';
import { Icons } from '@/components/ui/icons';

interface ProtectedLayoutProps {
  children: ReactNode;
}

export default function ProtectedLayout({ children }: ProtectedLayoutProps) {
  const { isAuthenticated, user } = useAuth({});

  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated && !user.isLoading) {
      navigate('/log-in');
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user.isLoading, isAuthenticated]);

  if (user && user.isLoading) {
    return (
      <div className="flex justify-center">
        <span className="border-2 border-primary p-2 rounded-lg mt-8">
          <Icons.spinner size={50} className="h-8 w-8 animate-spin" aria-hidden="true" />
        </span>
      </div>
    );
  }

  if (isAuthenticated) return children;

  return (
    <p>
      You need to log in to access this page. <Link to="/log-in">Log-in</Link>
    </p>
  );
}
