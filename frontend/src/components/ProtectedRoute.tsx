import { ReactNode, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

import { useAuth } from '@/hooks/auth';
import { Icons } from '@/components/ui/icons';
import CreateStoreModal from '@/components/models/CreateStoreModel';
import { useReadLocalStorage } from 'usehooks-ts';

interface ProtectedLayoutProps {
  children: ReactNode;
}

export default function ProtectedLayout({ children }: ProtectedLayoutProps) {
  const { isAuthenticated, user } = useAuth();
  const currentStoreId = useReadLocalStorage('currentStoreId');
  const navigate = useNavigate();
  const params = useParams();

  const spinner = (
    <div className="flex justify-center">
      <span className="border-2 border-primary p-2 rounded-xl mt-8">
        <Icons.spinner size={50} className="h-8 w-8 animate-spin" aria-hidden={!user.isLoading} />
      </span>
    </div>
  );

  const doesStoreIdExists = user.data?.stores?.some((store) => store.id === params.storeId);

  useEffect(() => {
    if (!isAuthenticated && !user.isLoading) {
      navigate('/log-in');
    } else if (
      isAuthenticated &&
      user.data?.stores !== undefined &&
      currentStoreId !== undefined &&
      user.data.stores.length > 0 &&
      !doesStoreIdExists
    ) {
      navigate(`/${currentStoreId}/overview`);
    } else if (
      isAuthenticated &&
      user.data?.stores !== undefined &&
      user.data.stores.length === 0
    ) {
      navigate('/');
    }
  }, [isAuthenticated, user.isLoading, user.data, navigate, currentStoreId, doesStoreIdExists]);

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
