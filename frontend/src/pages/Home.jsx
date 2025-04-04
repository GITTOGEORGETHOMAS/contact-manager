import { useContactsData } from '../hooks/useContactsData';
import ContactCard from '../components/ContactCard';
import Spinner from '../components/Spinner';
import { Link } from 'react-router-dom';

const Home = () => {
  const { contacts, loading, error, deleteContact, fetchContacts } = useContactsData();

  if (loading) {
    return <Spinner />;
  }

  if (error) {
    return (
      <div className="alert alert-danger">
        Error: {error}
        <button 
          className="btn btn-outline-danger ms-2" 
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
        <Link to="/add" className="btn btn-primary">Add New Contact</Link>
      </div>
      
      {contacts.length === 0 ? (
        <div className="text-center mt-5">
          <h4>No contacts found</h4>
          <p>Add your first contact to get started</p>
          <Link to="/add" className="btn btn-primary mt-2">Add Contact</Link>
        </div>
      ) : (
        <div className="row">
          {contacts.map(contact => (
            <div key={contact._id} className="col-md-6 col-lg-4 mb-3">
              <ContactCard 
                contact={contact} 
                onDelete={deleteContact}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;