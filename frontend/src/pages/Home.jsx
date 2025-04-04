import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getContacts, deleteContact } from '../services/api';
import ContactCard from '../components/ContactCard';
import Spinner from '../components/Spinner';
import { FaPlus } from 'react-icons/fa';

const Home = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Load contacts when component mounts
  useEffect(() => {
    fetchContacts();
  }, []);

  // Function to fetch contacts
  const fetchContacts = async () => {
    try {
      setLoading(true);
      const data = await getContacts();
      setContacts(data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch contacts. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Function to handle contact deletion
  const handleDelete = async (id) => {
    try {
      await deleteContact(id);
      setContacts(contacts.filter(contact => contact._id !== id));
    } catch (err) {
      alert('Failed to delete contact. Please try again.');
      console.error(err);
    }
  };

  if (loading) {
    return <Spinner />;
  }

  if (error) {
    return (
      <div className="container mt-4">
        <div className="alert alert-danger">{error}</div>
        <button 
          className="btn btn-primary" 
          onClick={fetchContacts}
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Your Contacts</h2>
        <Link to="/add" className="btn btn-success">
          <FaPlus className="me-1" /> Add Contact
        </Link>
      </div>

      {contacts.length === 0 ? (
        <div className="text-center my-5">
          <h3>No contacts found</h3>
          <p className="text-muted">Add your first contact to get started</p>
          <Link to="/add" className="btn btn-primary mt-2">
            Add Contact
          </Link>
        </div>
      ) : (
        <div className="row">
          {contacts.map(contact => (
            <div key={contact._id} className="col-md-6 col-lg-4 mb-3">
              <ContactCard 
                contact={contact} 
                onDelete={handleDelete} 
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;