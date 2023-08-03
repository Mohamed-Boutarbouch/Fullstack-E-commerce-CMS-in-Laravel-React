import { ReactNode, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useReadLocalStorage } from 'usehooks-ts';

import { useAuth } from '@/hooks/auth';
import { Icons } from '@/components/ui/icons';
import CreateStoreModal from '@/components/models/CreateStoreModel';
import useStoreApi from '@/hooks/store-api';

interface ProtectedLayoutProps {
  children: ReactNode;
}

export default function ProtectedLayout({ children }: ProtectedLayoutProps) {
  const { isAuthenticated, user } = useAuth();
  const { storesQuery, doesStoreIdExists } = useStoreApi();
  const currentStoreId = useReadLocalStorage('currentStoreId');
  const navigate = useNavigate();

  const spinner = (
    <div className="flex justify-center">
      <span className="border-2 border-primary p-2 rounded-xl mt-8">
        <Icons.spinner size={50} className="h-8 w-8 animate-spin" aria-hidden={!user.isLoading} />
      </span>
    </div>
  );

  useEffect(() => {
    if (!isAuthenticated && !user.isLoading) {
      navigate('/log-in');
    } else if (
      isAuthenticated &&
      storesQuery.data &&
      currentStoreId &&
      storesQuery.data.length > 0 &&
      !doesStoreIdExists
    ) {
      navigate(`/${currentStoreId}/overview`);
    } else if (isAuthenticated && storesQuery.isSuccess && storesQuery.data.length === 0) {
      navigate('/');
    }
  }, [
    isAuthenticated,
    user.isLoading,
    storesQuery.data,
    storesQuery.isSuccess,
    navigate,
    currentStoreId,
    doesStoreIdExists,
  ]);

  if (user.isLoading) return spinner;

  if (isAuthenticated && user.data?.stores !== undefined && user.data?.stores?.length > 0) {
    return (
      <>
        <CreateStoreModal />
        {children}
      </>
    );
  }

  return (
    <p>
      You need to log in to access this page. <Link to="/log-in">Log-in</Link>
    </p>
  );
}
