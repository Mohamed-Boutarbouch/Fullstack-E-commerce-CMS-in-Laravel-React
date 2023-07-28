import { useContext } from 'react';

import { ModalContext } from '@/context/ModalContext';

export function useStoreModal() {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('useStoreModal must be used within a ModalProvider');
  }
  return context;
}
