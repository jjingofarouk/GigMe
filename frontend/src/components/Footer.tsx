const Footer: React.FC = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-200 py-10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">GigMap</h3>
            <p className="text-gray-400 mb-4">
              Connecting freelancers and clients worldwide through an interactive map-based platform.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-gray-400 hover:text-white text-sm font-medium transition-colors bg-gray-800 px-3 py-1 rounded-lg hover:bg-indigo-600"
              >
                Facebook
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white text-sm font-medium transition-colors bg-gray-800 px-3 py-1 rounded-lg hover:bg-indigo-600"
              >
                Twitter
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white text-sm font-medium transition-colors bg-gray-800 px-3 py-1 rounded-lg hover:bg-indigo-600"
              >
                Instagram
              </a>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="/" className="text-gray-400 hover:text-white transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="/create" className="text-gray-400 hover:text-white transition-colors">
                  Create Pin
                </a>
              </li>
              <li>
                <a
                  href="/freelancers"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Browse Freelancers
                </a>
              </li>
              <li>
                <a href="/about" className="text-gray-400 hover:text-white transition-colors">
                  About Us
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <ul className="space-y-2 text-gray-400">
              <li className="flex items-start">
                <a
                  href="mailto:support@gigmap.com"
                  className="text-gray-400 hover:text-white font-medium transition-colors bg-gray-800 px-3 py-1 rounded-lg hover:bg-indigo-600"
                >
                  support@gigmap.com
                </a>
              </li>
              <li className="flex items-start">
                <a
                  href="tel:+15551234567"
                  className="text-gray-400 hover:text-white font-medium transition-colors bg-gray-800 px-3 py-1 rounded-lg hover:bg-indigo-600"
                >
                  +1 (555) 123-4567
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-8 pt-6 text-center">
          <p className="text-sm font-light tracking-wide">© {year} GigMap. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;