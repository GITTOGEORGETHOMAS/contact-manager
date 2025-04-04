import { Link } from 'react-router-dom';
import { FaUser, FaEnvelope, FaPhone, FaEdit, FaTrash } from 'react-icons/fa';

const ContactCard = ({ contact, onDelete }) => {
  const handleDelete = () => {
    if (window.confirm(`Are you sure you want to delete ${contact.name}?`)) {
      onDelete(contact._id);
    }
  };

  return (
    <div className="card mb-3">
      <div className="card-body">
        <h5 className="card-title">
          <FaUser className="me-2 text-primary" /> {contact.name}
        </h5>
        <p className="card-text">
          <FaEnvelope className="me-2 text-secondary" /> {contact.email}
        </p>
        <p className="card-text">
          <FaPhone className="me-2 text-secondary" /> {contact.phone}
        </p>
        <div className="d-flex justify-content-end mt-3">
          <Link to={`/edit/${contact._id}`} className="btn btn-sm btn-primary me-2">
            <FaEdit className="me-1" /> Edit
          </Link>
          <button 
            onClick={handleDelete} 
            className="btn btn-sm btn-danger"
          >
            <FaTrash className="me-1" /> Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default ContactCard;