import { useState } from 'react';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="bg-gradient-to-r from-gray-900 to-gray-800 text-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <Link to="/" className="flex items-center space-x-2">
            <div className="bg-indigo-600 rounded-full w-8 h-8 flex items-center justify-center text-white font-bold">
              G
            </div>
            <span className="text-xl font-bold">GigMap</span>
          </Link>

          {/* Desktop navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-white hover:text-indigo-300 transition-colors py-2">
              Home
            </Link>
            <Link
              to="/freelancers"
              className="text-white hover:text-indigo-300 transition-colors py-2"
            >
              Browse
            </Link>
            <Link to="/about" className="text-white hover:text-indigo-300 transition-colors py-2">
              About
            </Link>
            <Link
              to="/contact"
              className="text-white hover:text-indigo-300 transition-colors py-2"
            >
              Contact
            </Link>
            <Link
              to="/create"
              className="inline-flex items-center justify-center bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition-colors"
            >
              Create Pin
            </Link>
          </nav>

          {/* Mobile menu button */}
          <button
            className="md:hidden focus:outline-none text-white font-bold"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? 'Close' : 'Menu'}
          </button>
        </div>

        {/* Mobile navigation */}
        {mobileMenuOpen && (
          <nav className="md:hidden py-4 border-t border-gray-700">
            <ul className="space-y-2">
              <li>
                <Link
                  to="/"
                  className="block p-2 hover:bg-gray-800 rounded"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/freelancers"
                  className="block p-2 hover:bg-gray-800 rounded"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Browse
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="block p-2 hover:bg-gray-800 rounded"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="block p-2 hover:bg-gray-800 rounded"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  to="/create"
                  className="block p-2 bg-indigo-600 hover:bg-indigo-700 rounded text-center"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Create Pin
                </Link>
              </li>
            </ul>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;