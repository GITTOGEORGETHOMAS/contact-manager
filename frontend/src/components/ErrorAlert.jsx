import { FaExclamationTriangle } from 'react-icons/fa';

const ErrorAlert = ({ message, onRetry }) => {
  return (
    <div className="alert alert-danger d-flex align-items-center" role="alert">
      <FaExclamationTriangle className="me-2" size={18} />
      <div className="flex-grow-1">
        {message || 'An error occurred'}
      </div>
      {onRetry && (
        <button
          type="button"
          className="btn btn-sm btn-outline-danger ms-2"
          onClick={onRetry}
        >
          Retry
        </button>
      )}
    </div>
  );
};

export default ErrorAlert;