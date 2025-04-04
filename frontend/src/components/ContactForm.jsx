import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const ContactForm = ({ contact = null, onSubmit, isEdit = false }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: ''
  });
  const [loading, setLoading] = useState(false);

  // When editing, populate form with contact data
  useEffect(() => {
    if (contact) {
      setFormData({
        name: contact.name || '',
        email: contact.email || '',
        phone: contact.phone || ''
      });
    }
  }, [contact]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      await onSubmit(formData);
      navigate('/');
    } catch (error) {
      console.error('Form submission error:', error);
      alert('An error occurred while saving the contact.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label htmlFor="name" className="form-label">Name</label>
        <input
          type="text"
          className="form-control"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>
      
      <div className="mb-3">
        <label htmlFor="email" className="form-label">Email</label>
        <input
          type="email"
          className="form-control"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>
      
      <div className="mb-3">
        <label htmlFor="phone" className="form-label">Phone</label>
        <input
          type="text"
          className="form-control"
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          required
        />
      </div>
      
      <div className="d-flex">
        <button 
          type="submit" 
          className="btn btn-primary me-2"
          disabled={loading}
        >
          {loading ? 'Saving...' : isEdit ? 'Update Contact' : 'Add Contact'}
        </button>
        <button
          type="button"
          className="btn btn-secondary"
          onClick={() => navigate('/')}
          disabled={loading}
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default ContactForm;