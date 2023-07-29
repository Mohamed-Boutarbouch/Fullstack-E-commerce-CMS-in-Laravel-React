import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useReadLocalStorage } from 'usehooks-ts';

import CreateStoreModal from '@/components/CreateStoreModel';
import { useStoreModal } from '@/hooks/store-modal';
import { useAuth } from '@/hooks/auth';

export default function CreateStorePage() {
  const navigate = useNavigate();
  const { user } = useAuth({});
  const { isOpen, onOpen, onClose } = useStoreModal();
  const currentStoreId = useReadLocalStorage('currentStoreId');

  const doesStoreIdExists = user.data?.stores?.some((store) => store.id === currentStoreId);

  useEffect(() => {
    if (doesStoreIdExists) {
      navigate(`${currentStoreId}/overview`);
      onClose();
      return;
    }

    if (!isOpen && !doesStoreIdExists) {
      onOpen();
    }
  }, [isOpen, onOpen, onClose, currentStoreId, navigate, doesStoreIdExists]);

  return <CreateStoreModal />;
}
