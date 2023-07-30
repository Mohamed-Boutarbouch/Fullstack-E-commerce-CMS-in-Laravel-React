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
    if (doesStoreIdExists) {
      navigate(`${currentStoreId}/overview`);
      onClose();
      return;
    }
    if (isAuthenticated && user.data?.stores && user.data.stores.length > 0 && !currentStoreId) {
      setCurrentStoreId(`/${user.data.stores[0].id}`);
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
  ]);

  return <CreateStoreModal />;
}
