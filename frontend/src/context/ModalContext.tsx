import { ReactNode, createContext, useContext, useState } from 'react';

interface ModalContextType {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

// eslint-disable-next-line react-refresh/only-export-components
export function useModalContext() {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('useModalContext must be used within a ModalProvider');
  }
  return context;
}

export function ModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  const onOpen = () => setIsOpen(true);
  const onClose = () => setIsOpen(false);

  const value = {
    isOpen,
    onOpen,
    onClose,
  };

  return <ModalContext.Provider value={value}>{children}</ModalContext.Provider>;
}
