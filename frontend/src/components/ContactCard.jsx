import { Link } from 'react-router-dom';
import { FaEdit, FaTrash, FaUser, FaEnvelope, FaPhone } from 'react-icons/fa';

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
          <FaUser className="me-2" /> {contact.name}
        </h5>
        <p className="card-text">
          <FaEnvelope className="me-2" /> {contact.email}
        </p>
        <p className="card-text">
          <FaPhone className="me-2" /> {contact.phone}
        </p>
        <div className="d-flex gap-2">
          <Link to={`/edit/${contact._id}`} className="btn btn-primary">
            <FaEdit className="me-1" /> Edit
          </Link>
          <button onClick={handleDelete} className="btn btn-danger">
            <FaTrash className="me-1" /> Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default ContactCard;