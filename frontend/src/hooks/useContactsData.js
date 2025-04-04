import { useState, useEffect, useCallback } from 'react';
import * as contactService from '../api/contactService';

export const useContactsData = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch all contacts
  const fetchContacts = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await contactService.getContacts();
      setContacts(data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, []);

  // Fetch a single contact
  const fetchContact = async (id) => {
    try {
      return await contactService.getContact(id);
    } catch (err) {
      setError(err);
      return null;
    }
  };

  // Add a new contact
  const addContact = async (contact) => {
    try {
      const newContact = await contactService.createContact(contact);
      setContacts([...contacts, newContact]);
      return { success: true, data: newContact };
    } catch (err) {
      setError(err);
      return { success: false, error: err };
    }
  };

  // Update a contact
  const updateContact = async (id, contact) => {
    try {
      const updatedContact = await contactService.updateContact(id, contact);
      setContacts(contacts.map(c => c._id === id ? updatedContact : c));
      return { success: true, data: updatedContact };
    } catch (err) {
      setError(err);
      return { success: false, error: err };
    }
  };

  // Delete a contact
  const deleteContact = async (id) => {
    try {
      await contactService.deleteContact(id);
      setContacts(contacts.filter(c => c._id !== id));
      return { success: true };
    } catch (err) {
      setError(err);
      return { success: false, error: err };
    }
  };

  // Load contacts on initial render
  useEffect(() => {
    fetchContacts();
  }, [fetchContacts]);

  return {
    contacts,
    loading,
    error,
    fetchContacts,
    fetchContact,
    addContact,
    updateContact,
    deleteContact
  };
};