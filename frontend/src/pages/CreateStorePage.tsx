import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useLocalStorage } from 'usehooks-ts';

import CreateStoreModal from '@/components/models/CreateStoreModel';
import { useStoreModal } from '@/hooks/store-modal';
import { useAuth } from '@/hooks/auth';
import { useStoreApi } from '@/hooks/store-api';

export default function CreateStorePage() {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const { storesQuery, doesStoreIdExists } = useStoreApi();
  const { isOpen, onOpen, onClose } = useStoreModal();
  const [currentStoreId, setCurrentStoreId] = useLocalStorage<string | undefined>(
    'currentStoreId',
    undefined,
  );

  useEffect(() => {
    handleRedirect();
    handleModalOpen();
  }, [isOpen, currentStoreId, isAuthenticated, storesQuery.data, setCurrentStoreId]);

  function handleRedirect() {
    if (!user.isLoading && storesQuery.isSuccess && doesStoreIdExists) {
      navigate(`${currentStoreId}/overview`);
      onClose();
    } else if (
      isAuthenticated &&
      storesQuery.data &&
      storesQuery.data.length > 0 &&
      !currentStoreId
    ) {
      setCurrentStoreId(`/${storesQuery.data[0].id}`);
      navigate(`/${storesQuery.data[0].id}/overview`);
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
