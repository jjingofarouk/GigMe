import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="max-w-7xl mx-auto flex justify-between">
        <Link to="/" className="text-xl font-bold">
          <img src="/logo.png" alt="GigMap" className="h-8 inline" />
        </Link>
        <div>
          <Link to="/" className="mr-4 hover:underline">Home</Link>
          <Link to="/create" className="hover:underline">Create Pin</Link>
        </div>
      </div>
    </nav>
  );
};

export default Header;