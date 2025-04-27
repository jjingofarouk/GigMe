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
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-indigo-50 to-purple-50">
      <Header />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-violet-600 via-fuchsia-600 to-pink-600 text-white py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-5xl font-bold mb-6 drop-shadow-md">Find Skilled Freelancers Near You</h1>
              <p className="text-xl mb-10 opacity-90">Connect with talented professionals in your area for your next project</p>
              
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search by name, skill, or location..."
                  className="w-full py-4 px-8 rounded-full text-gray-800 focus:outline-none focus:ring-4 focus:ring-pink-300 shadow-lg"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button className="absolute right-3 top-3 bg-gradient-to-r from-fuchsia-500 to-pink-500 text-white p-2 rounded-full hover:from-fuchsia-600 hover:to-pink-600 transition-all shadow-md">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Categories */}
        <div className="container mx-auto px-4 py-12">
          <div className="flex flex-wrap justify-center gap-3 mb-10">
            <button 
              onClick={() => setSelectedCategory('all')}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all shadow-sm ${
                selectedCategory === 'all' 
                  ? 'bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white' 
                  : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
              }`}
            >
              All
            </button>
            {allSkills.map((skill, index) => (
              <button 
                key={index}
                onClick={() => setSelectedCategory(skill)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all shadow-sm ${
                  selectedCategory === skill 
                    ? 'bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white' 
                    : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                }`}
              >
                {skill}
              </button>
            ))}
          </div>
          
          {/* Map and Freelancers Section */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Map */}
            <div className="lg:col-span-2 rounded-2xl overflow-hidden shadow-xl bg-white border border-purple-100">
              {loading ? (
                <div className="h-96 flex items-center justify-center bg-gray-50">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-fuchsia-600"></div>
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
                          <h3 className="font-bold text-lg mb-1 text-fuchsia-700">{freelancer.name}</h3>
                          <p className="text-sm mb-2 text-gray-600">{freelancer.location}</p>
                          <p className="text-sm mb-3 line-clamp-2">{freelancer.blurb}</p>
                          <Link 
                            to={`/freelancer/${freelancer.id}`}
                            className="inline-block bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white px-4 py-1 rounded text-sm hover:from-violet-700 hover:to-fuchsia-700 transition-colors"
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
            <div className="bg-white rounded-2xl shadow-xl p-6 border border-purple-100">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-fuchsia-900">Freelancers</h2>
                <span className="bg-gradient-to-r from-violet-100 to-fuchsia-100 text-fuchsia-800 text-xs font-medium px-3 py-1 rounded-full">
                  {filteredFreelancers.length} found
                </span>
              </div>
              
              {loading ? (
                <div className="flex items-center justify-center py-12">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-fuchsia-600"></div>
                </div>
              ) : filteredFreelancers.length === 0 ? (
                <div className="text-center py-12 text-gray-500">
                  No freelancers found matching your criteria
                </div>
              ) : (
                <div className="space-y-4 max-h-96 overflow-y-auto pr-2">
                  {filteredFreelancers.slice(0, 6).map((freelancer) => (
                    <div key={freelancer.id} className="p-5 border border-purple-100 rounded-xl hover:border-fuchsia-300 transition-all hover:shadow-md bg-gradient-to-br from-white to-purple-50">
                      <h3 className="font-bold text-fuchsia-900">{freelancer.name}</h3>
                      <p className="text-sm text-gray-600 mb-2">{freelancer.location}</p>
                      <p className="text-sm text-gray-700 mb-3 line-clamp-2">{freelancer.blurb}</p>
                      <div className="flex flex-wrap gap-1 mb-3">
                        {freelancer.bestThings.map((skill, index) => (
                          <span key={index} className="bg-gradient-to-r from-violet-100 to-fuchsia-100 text-fuchsia-800 text-xs px-3 py-1 rounded-full">
                            {skill}
                          </span>
                        ))}
                      </div>
                      <Link to={`/freelancer/${freelancer.id}`}>
                        <Button className="w-full bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-700 hover:to-fuchsia-700 text-white py-2 px-4 rounded-lg transition-all shadow-md">View Profile</Button>
                      </Link>
                    </div>
                  ))}
                </div>
              )}
              
              {filteredFreelancers.length > 6 && (
                <div className="mt-6 text-center">
                  <Link to="/freelancers" className="text-fuchsia-600 hover:text-fuchsia-800 font-medium underline decoration-2 underline-offset-2 hover:decoration-fuchsia-400">
                    View all {filteredFreelancers.length} freelancers
                  </Link>
                </div>
              )}
            </div>
          </div>
          
          {/* Call to Action */}
          <div className="mt-16 bg-gradient-to-r from-violet-600 via-fuchsia-600 to-pink-600 rounded-2xl p-10 text-white text-center shadow-xl">
            <h2 className="text-3xl font-bold mb-4">Are you a freelancer?</h2>
            <p className="mb-8 text-lg opacity-90 max-w-lg mx-auto">Join our platform and let clients find you. Create your freelancer pin today!</p>
            <Link to="/create">
              <button className="bg-white text-fuchsia-700 px-8 py-3 rounded-lg font-medium hover:bg-gray-50 transition-all shadow-lg hover:shadow-xl">
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