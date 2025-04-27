import { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { getFreelancers } from '../services/api';
import L from 'leaflet';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Button from '../components/Button';

// Define Freelancer type based on backend schema
interface Freelancer {
  id: string;
  name: string;
  blurb: string;
  bestThings: string[];
  location: string;
  contact: string;
  latitude: number;
  longitude: number;
  createdAt: string;
}

const Home: React.FC = () => {
  const [freelancers, setFreelancers] = useState<Freelancer[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  useEffect(() => {
    const fetchFreelancers = async () => {
      try {
        setLoading(true);
        const data = await getFreelancers();
        setFreelancers(data);
      } catch (error) {
        console.error('Error fetching freelancers:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchFreelancers();
  }, []);

  // For demo purposes, extract unique skills from all freelancers
  const allSkills = Array.from(
    new Set(freelancers.flatMap(f => f.bestThings))
  ).slice(0, 6); // Limit to 6 categories for UI

  const filteredFreelancers = freelancers.filter(freelancer => {
    const matchesSearch = searchQuery === '' || 
      freelancer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      freelancer.blurb.toLowerCase().includes(searchQuery.toLowerCase()) ||
      freelancer.location.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = selectedCategory === 'all' || 
      freelancer.bestThings.some(skill => skill.toLowerCase().includes(selectedCategory.toLowerCase()));
    
    return matchesSearch && matchesCategory;
  });

  const markerIcon = new L.Icon({
    iconUrl: '/map-marker.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
  });

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl font-bold mb-4">Find Skilled Freelancers Near You</h1>
              <p className="text-xl mb-8">Connect with talented professionals in your area for your next project</p>
              
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search by name, skill, or location..."
                  className="w-full py-4 px-6 rounded-full text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button className="absolute right-2 top-2 bg-indigo-700 text-white p-2 rounded-full">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Categories */}
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            <button 
              onClick={() => setSelectedCategory('all')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                selectedCategory === 'all' 
                  ? 'bg-indigo-600 text-white' 
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              All
            </button>
            {allSkills.map((skill, index) => (
              <button 
                key={index}
                onClick={() => setSelectedCategory(skill)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  selectedCategory === skill 
                    ? 'bg-indigo-600 text-white' 
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {skill}
              </button>
            ))}
          </div>
          
          {/* Map and Freelancers Section */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Map */}
            <div className="lg:col-span-2 rounded-xl overflow-hidden shadow-lg bg-white">
              {loading ? (
                <div className="h-96 flex items-center justify-center bg-gray-100">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
                </div>
              ) : (
                <MapContainer 
                  center={[20, 0]} 
                  zoom={2} 
                  style={{ height: '500px', width: '100%' }}
                  className="z-0"
                >
                  <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  />
                  {filteredFreelancers.map((freelancer) => (
                    <Marker
                      key={freelancer.id}
                      position={[freelancer.latitude, freelancer.longitude]}
                      icon={markerIcon}
                    >
                      <Popup className="custom-popup">
                        <div className="text-center">
                          <h3 className="font-bold text-lg mb-1">{freelancer.name}</h3>
                          <p className="text-sm mb-2">{freelancer.location}</p>
                          <p className="text-sm mb-3 line-clamp-2">{freelancer.blurb}</p>
                          <Link 
                            to={`/freelancer/${freelancer.id}`}
                            className="inline-block bg-indigo-600 text-white px-4 py-1 rounded text-sm hover:bg-indigo-700 transition-colors"
                          >
                            View Profile
                          </Link>
                        </div>
                      </Popup>
                    </Marker>
                  ))}
                </MapContainer>
              )}
            </div>
            
            {/* Freelancers List */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-gray-800">Freelancers</h2>
                <span className="bg-indigo-100 text-indigo-800 text-xs font-medium px-2.5 py-0.5 rounded">
                  {filteredFreelancers.length} found
                </span>
              </div>
              
              {loading ? (
                <div className="flex items-center justify-center py-12">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
                </div>
              ) : filteredFreelancers.length === 0 ? (
                <div className="text-center py-12 text-gray-500">
                  No freelancers found matching your criteria
                </div>
              ) : (
                <div className="space-y-4 max-h-96 overflow-y-auto pr-2">
                  {filteredFreelancers.slice(0, 6).map((freelancer) => (
                    <div key={freelancer.id} className="p-4 border border-gray-200 rounded-lg hover:border-indigo-300 transition-all">
                      <h3 className="font-bold text-gray-800">{freelancer.name}</h3>
                      <p className="text-sm text-gray-600 mb-2">{freelancer.location}</p>
                      <p className="text-sm text-gray-700 mb-3 line-clamp-2">{freelancer.blurb}</p>
                      <div className="flex flex-wrap gap-1 mb-3">
                        {freelancer.bestThings.map((skill, index) => (
                          <span key={index} className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded">
                            {skill}
                          </span>
                        ))}
                      </div>
                      <Link to={`/freelancer/${freelancer.id}`}>
                        <Button>View Profile</Button>
                      </Link>
                    </div>
                  ))}
                </div>
              )}
              
              {filteredFreelancers.length > 6 && (
                <div className="mt-4 text-center">
                  <Link to="/freelancers" className="text-indigo-600 hover:text-indigo-800 font-medium">
                    View all {filteredFreelancers.length} freelancers
                  </Link>
                </div>
              )}
            </div>
          </div>
          
          {/* Call to Action */}
          <div className="mt-16 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-xl p-8 text-white text-center">
            <h2 className="text-2xl font-bold mb-4">Are you a freelancer?</h2>
            <p className="mb-6">Join our platform and let clients find you. Create your freelancer pin today!</p>
            <Link to="/create">
              <button className="bg-white text-indigo-700 px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition-all">
                Create Your Pin
              </button>
            </Link>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Home;