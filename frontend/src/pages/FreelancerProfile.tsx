import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getFreelancerById } from '../services/api';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import L from 'leaflet';
import Button from '../components/Button'; // Default import is correct

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

const FreelancerProfile: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [freelancer, setFreelancer] = useState<Freelancer | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('about');

  useEffect(() => {
    const fetchFreelancer = async () => {
      try {
        setLoading(true);
        const data = await getFreelancerById(id!);
        setFreelancer(data);
      } catch (err: any) {
        setError(err.response?.data?.error || 'Failed to load freelancer');
      } finally {
        setLoading(false);
      }
    };
    fetchFreelancer();
  }, [id]);

  const markerIcon = new L.Icon({
    iconUrl: '/map-marker.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
  });

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-indigo-600 font-medium animate-pulse">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center p-8 max-w-md">
          <div className="bg-red-100 text-red-700 p-4 rounded-lg mb-6">
            <p className="font-medium">{error}</p>
          </div>
          <Link to="/">
            <Button>Return to Homepage</Button>
          </Link>
        </div>
      </div>
    );
  }

  if (!freelancer) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center p-8 max-w-md">
          <div className="bg-yellow-100 text-yellow-700 p-4 rounded-lg mb-6">
            <p className="font-medium">Freelancer not found</p>
          </div>
          <Link to="/">
            <Button>Return to Homepage</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 h-48 md:h-60 relative">
          <div className="absolute -bottom-16 left-8">
            <div className="rounded-full border-4 border-white w-32 h-32 overflow-hidden bg-white">
              <img
                src="/profile-placeholder.jpg"
                alt={freelancer.name}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        <div className="pt-20 pb-6 px-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{freelancer.name}</h1>
              <p className="text-gray-600 mt-1">
                <span className="font-medium bg-gray-200 px-2 py-0.5 rounded">Location:</span>{' '}
                {freelancer.location}
              </p>
            </div>

            <div className="mt-4 md:mt-0 flex space-x-3">
              <a
                href={`mailto:${freelancer.contact}`}
                className="inline-flex items-center px-4 py-2 border border-indigo-600 text-indigo-600 rounded-lg hover:bg-indigo-50 transition-colors"
              >
                Contact
              </a>
              <button className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
                Save
              </button>
            </div>
          </div>

          {/* Tabs */}
          <div className="mt-8 border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              <button
                onClick={() => setActiveTab('about')}
                className={`pb-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'about'
                    ? 'border-indigo-600 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                About
              </button>
              <button
                onClick={() => setActiveTab('portfolio')}
                className={`pb-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'portfolio'
                    ? 'border-indigo-600 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Portfolio
              </button>
              <button
                onClick={() => setActiveTab('reviews')}
                className={`pb-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'reviews'
                    ? 'border-indigo-600 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Reviews
              </button>
            </nav>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="mt-8">
        {activeTab === 'about' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              {/* Bio */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">About</h2>
                <p className="text-gray-700">{freelancer.blurb}</p>
              </div>

              {/* Skills */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Skills & Expertise</h2>
                <div className="flex flex-wrap gap-2">
                  {freelancer.bestThings.map((thing, index) => (
                    <span
                      key={index}
                      className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm"
                    >
                      {thing}
                    </span>
                  ))}
                </div>
              </div>

              {/* Location */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Location</h2>
                <div className="h-64 rounded-lg overflow-hidden">
                  <MapContainer
                    center={[freelancer.latitude, freelancer.longitude]}
                    zoom={13}
                    style={{ height: '100%', width: '100%' }}
                  >
                    <TileLayer
                      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                      attribution='Map data © <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, licensed under <a href="https://www.opendatacommons.org/licenses/odbl/">ODbL</a>'
                    />
                    <Marker position={[freelancer.latitude, freelancer.longitude]} icon={markerIcon} />
                  </MapContainer>
                </div>
              </div>
            </div>

            <div>
              {/* Contact Info */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h2 className="text-lg font-bold text-gray-900 mb-4">Contact Information</h2>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Email/Phone</p>
                    <p className="font-medium">{freelancer.contact}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Member Since</p>
                    <p className="font-medium">
                      {new Date(freelancer.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Location</p>
                    <p className="font-medium">{freelancer.location}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'portfolio' && (
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="text-center py-12">
              <h3 className="text-lg font-medium text-gray-900 mb-2">No portfolio items yet</h3>
              <p className="text-gray-500">This freelancer hasn't added any portfolio items.</p>
            </div>
          </div>
        )}

        {activeTab === 'reviews' && (
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="text-center py-12">
              <h3 className="text-lg font-medium text-gray-900 mb-2">No reviews yet</h3>
              <p className="text-gray-500">This freelancer hasn't received any reviews yet.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FreelancerProfile;