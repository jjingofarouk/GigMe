import { Link } from 'react-router-dom';
import Button from '../components/Button';
import './NotFound.css';

const NotFound: React.FC = () => {
  return (
    <div className="not-found">
      <div className="not-found__container">
        <div className="not-found__card">
          <div className="not-found__icon">
            <span className="not-found__icon-text">!</span>
          </div>
          <h1 className="not-found__title">404 - Page Not Found</h1>
          <p className="not-found__message">
            Oops! The page you're looking for doesn't exist or has been moved.
          </p>
          <Link to="/">
            <Button variant="primary" size="lg" className="not-found__button">
              <span className="not-found__button-icon">←</span> Back to Homepage
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;