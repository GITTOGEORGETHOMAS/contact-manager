import { createContact } from '../services/api';
import ContactForm from '../components/ContactForm';

const AddContact = () => {
  const handleSubmit = async (formData) => {
    try {
      await createContact(formData);
    } catch (error) {
      console.error('Error adding contact:', error);
      throw error;
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Add New Contact</h2>
      <div className="card">
        <div className="card-body">
          <ContactForm onSubmit={handleSubmit} isEdit={false} />
        </div>
      </div>
    </div>
  );
};

export default AddContact;