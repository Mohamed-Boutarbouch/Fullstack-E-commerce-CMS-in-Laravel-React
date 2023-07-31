import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useLocalStorage } from 'usehooks-ts';

import CreateStoreModal from '@/components/CreateStoreModel';
import { useStoreModal } from '@/hooks/store-modal';
import { useAuth } from '@/hooks/auth';

export default function CreateStorePage() {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth({});
  const { isOpen, onOpen, onClose } = useStoreModal();
  const [currentStoreId, setCurrentStoreId] = useLocalStorage<string | undefined>(
    'currentStoreId',
    undefined,
  );

  const doesStoreIdExists = user.data?.stores?.some((store) => store.id === currentStoreId);

  useEffect(() => {
    if (doesStoreIdExists && !user.isLoading) {
      navigate(`${currentStoreId}/overview`);
      onClose();
      return;
    }
    if (isAuthenticated && user.data?.stores && user.data.stores.length > 0 && !currentStoreId) {
      setCurrentStoreId(`/${user.data.stores[0].id}`);

      console.log('Hello from CreateStorePage.tsx');

      navigate(`/${user.data.stores[0].id}/overview`);
      onClose();
      return;
    }
    if (!isOpen && !doesStoreIdExists) {
      onOpen();
    }
  }, [
    isOpen,
    onOpen,
    onClose,
    currentStoreId,
    navigate,
    doesStoreIdExists,
    isAuthenticated,
    user.data?.stores,
    setCurrentStoreId,
    user.isLoading,
  ]);

  return <CreateStoreModal />;
}
