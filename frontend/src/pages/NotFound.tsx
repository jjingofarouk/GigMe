import { Link } from 'react-router-dom';
import Button from '../components/Button'; // Default import is correct

const NotFound: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="text-center max-w-md">
        <div className="bg-white p-8 rounded-xl shadow-lg">
          <div className="inline-flex items-center justify-center w-16 h-16 mb-6 bg-red-100 rounded-full">
            <span className="text-2xl font-bold text-red-600">!</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">404 - Page Not Found</h1>
          <p className="text-gray-600 mb-8">
            Oops! The page you're looking for doesn't exist or has been moved.
          </p>
          <Link to="/">
            <Button variant="primary" size="lg" className="inline-flex items-center justify-center">
              <span className="mr-2 font-bold">←</span> Back to Homepage
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;