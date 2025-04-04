import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useContactsData } from '../hooks/useContactsData';
import ContactForm from '../components/ContactForm';
import Spinner from '../components/Spinner';

const EditContact = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { fetchContact, updateContact } = useContactsData();
  const [contact, setContact] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getContact = async () => {
      try {
        const data = await fetchContact(id);
        if (data) {
          setContact(data);
        } else {
          navigate('/');
        }
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    getContact();
  }, [id, fetchContact, navigate]);

  const handleSubmit = async (formData) => {
    return await updateContact(id, formData);
  };

  if (loading) {
    return <Spinner />;
  }

  if (error) {
    return (
      <div className="alert alert-danger">
        Error: {error}
        <button 
          className="btn btn-outline-danger ms-2" 
          onClick={() => navigate('/')}
        >
          Go Back
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
            isEditing={true} 
          />
        </div>
      </div>
    </div>
  );
};

export default EditContact;