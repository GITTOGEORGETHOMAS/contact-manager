import { createContext, useContext } from 'react';
import { useContactsData } from '../hooks/useContactsData';

// Create context
const ContactContext = createContext();

// Create provider component
export function ContactProvider({ children }) {
  const contactMethods = useContactsData();

  return (
    <ContactContext.Provider value={contactMethods}>
      {children}
    </ContactContext.Provider>
  );
}

// Create custom hook to use the contact context
export function useContactContext() {
  const context = useContext(ContactContext);
  if (!context) {
    throw new Error('useContactContext must be used within a ContactProvider');
  }
  return context;
}