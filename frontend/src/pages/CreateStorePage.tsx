import CreateStoreModal from '@/components/CreateStoreModel';
import { useStoreModal } from '@/hooks/store-modal';
import { useEffect } from 'react';

export default function CreateStorePage() {
  const { isOpen, onOpen } = useStoreModal();

  useEffect(() => {
    if (!isOpen) {
      onOpen();
    }
  }, [isOpen, onOpen]);

  return <CreateStoreModal />;
}
