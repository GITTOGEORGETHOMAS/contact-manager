import { useContactsData } from '../hooks/useContactsData';
import ContactForm from '../components/ContactForm';

const AddContact = () => {
  const { addContact } = useContactsData();

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Add New Contact</h2>
      <div className="card">
        <div className="card-body">
          <ContactForm onSubmit={addContact} />
        </div>
      </div>
    </div>
  );
};

export default AddContact;