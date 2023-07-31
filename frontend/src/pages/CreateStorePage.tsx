import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useLocalStorage } from 'usehooks-ts';

import CreateStoreModal from '@/components/models/CreateStoreModel';
import { useStoreModal } from '@/hooks/store-modal';
import { useAuth } from '@/hooks/auth';

export default function CreateStorePage() {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const { isOpen, onOpen, onClose } = useStoreModal();
  const [currentStoreId, setCurrentStoreId] = useLocalStorage<string | undefined>(
    'currentStoreId',
    undefined,
  );

  const doesStoreIdExists = user.data?.stores?.some((store) => store.id === currentStoreId);

  useEffect(() => {
    handleRedirect();
    handleModalOpen();
  }, [isOpen, currentStoreId, isAuthenticated, user.data?.stores, setCurrentStoreId]);

  function handleRedirect() {
    if (doesStoreIdExists && !user.isLoading) {
      navigate(`${currentStoreId}/overview`);
      onClose();
    } else if (
      isAuthenticated &&
      user.data?.stores &&
      user.data.stores.length > 0 &&
      !currentStoreId
    ) {
      setCurrentStoreId(`/${user.data.stores[0].id}`);
      navigate(`/${user.data.stores[0].id}/overview`);
      onClose();
    }
  }

  function handleModalOpen() {
    if (!isOpen && !doesStoreIdExists) {
      onOpen();
    }
  }

  return <CreateStoreModal />;
}
