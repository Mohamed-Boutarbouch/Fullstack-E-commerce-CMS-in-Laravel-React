import { ReactNode, createContext, useState } from 'react';

interface ModalContextType {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

export const ModalContext = createContext<ModalContextType | undefined>(undefined);

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
