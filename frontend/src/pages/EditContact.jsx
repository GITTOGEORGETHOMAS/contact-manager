import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getContact, updateContact } from '../services/api';
import ContactForm from '../components/ContactForm';
import Spinner from '../components/Spinner';

const EditContact = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [contact, setContact] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchContact = async () => {
      try {
        setLoading(true);
        const data = await getContact(id);
        setContact(data);
        setError(null);
      } catch (err) {
        setError('Failed to fetch contact details');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchContact();
  }, [id]);

  const handleSubmit = async (formData) => {
    try {
      await updateContact(id, formData);
    } catch (error) {
      console.error('Error updating contact:', error);
      throw error;
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
          onClick={() => navigate('/')}
        >
          Back to Contacts
        </button>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Edit Contact</h2>
      <div className="card">
        <div className="card-body">
          <ContactForm 
            contact={contact} 
            onSubmit={handleSubmit} 
            isEdit={true} 
          />
        </div>
      </div>
    </div>
  );
};

export default EditContact;