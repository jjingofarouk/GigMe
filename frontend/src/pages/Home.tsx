// src/components/Home.tsx
import { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { getFreelancers } from '../services/api';
import L from 'leaflet';
import { Link } from 'react-router-dom';
import Button from '../components/Button';
import './Home.css';

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

  const allSkills = Array.from(new Set(freelancers.flatMap(f => f.bestThings))).slice(0, 6);

  const filteredFreelancers = freelancers.filter(freelancer => {
    const matchesSearch =
      searchQuery === '' ||
      freelancer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      freelancer.blurb.toLowerCase().includes(searchQuery.toLowerCase()) ||
      freelancer.location.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      selectedCategory === 'all' ||
      freelancer.bestThings.some(skill => skill.toLowerCase().includes(selectedCategory.toLowerCase()));

    return matchesSearch && matchesCategory;
  });

  const markerIcon = L.divIcon({
    html: '<span style="font-size: 24px; color: red;">🔴</span>',
    className: '',
    iconSize: [24, 24],
    iconAnchor: [12, 24],
  });

  return (
    <div className="app-container">
      <main className="main-content">
        {/* Hero Section */}
        <div className="hero-section">
          <div className="container">
            <div className="hero-content">
              <h1>Find Skilled Freelancers Near You</h1>
              <p>Connect with talented professionals in your area for your next project</p>
              <div className="search-container">
                <input
                  type="text"
                  placeholder="Search by name, skill, or location..."
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                />
                <button className="search-button">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="search-icon"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Categories */}
        <div className="container">
          <div className="categories-container">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`category-button ${selectedCategory === 'all' ? 'active' : ''}`}
            >
              All
            </button>
            {allSkills.map((skill, index) => (
              <button
                key={index}
                onClick={() => setSelectedCategory(skill)}
                className={`category-button ${selectedCategory === skill ? 'active' : ''}`}
              >
                {skill}
              </button>
            ))}
          </div>

          {/* Map and Freelancers Section */}
          <div className="grid-layout">
            {/* Map */}
            <div className="map-container">
              {loading ? (
                <div className="loader-container">
                  <div className="loader"></div>
                </div>
              ) : (
                <MapContainer center={[20, 0]} zoom={2} style={{ height: '100%', width: '100%' }} className="map">
                  <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='Map data © <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, licensed under <a href="https://www.opendatacommons.org/licenses/odbl/">ODbL</a>'
                  />
                  {filteredFreelancers.map(freelancer => (
                    <Marker
                      key={freelancer.id}
                      position={[freelancer.latitude, freelancer.longitude]}
                      icon={markerIcon}
                    >
                      <Popup className="custom-popup">
                        <div className="popup-content">
                          <h3>{freelancer.name}</h3>
                          <p className="location">{freelancer.location}</p>
                          <p className="blurb">{freelancer.blurb}</p>
                          <Link to={`/freelancer/${freelancer.id}`} className="view-profile-link">
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
            <div className="freelancers-container">
              <div className="freelancers-header">
                <h2>Freelancers</h2>
                <span className="freelancer-count">{filteredFreelancers.length} found</span>
              </div>

              {loading ? (
                <div className="loader-container">
                  <div className="loader"></div>
                </div>
              ) : filteredFreelancers.length === 0 ? (
                <div className="no-results">No freelancers found matching your criteria</div>
              ) : (
                <div className="freelancers-list">
                  {filteredFreelancers.slice(0, 6).map(freelancer => (
                    <div key={freelancer.id} className="freelancer-card">
                      <h3>{freelancer.name}</h3>
                      <p className="location">{freelancer.location}</p>
                      <p className="blurb">{freelancer.blurb}</p>
                      <div className="skills-container">
                        {freelancer.bestThings.map((skill, index) => (
                          <span key={index} className="skill-tag">
                            {skill}
                          </span>
                        ))}
                      </div>
                      <Link to={`/freelancer/${freelancer.id}`} className="profile-link">
                        <Button className="view-profile-button">View Profile</Button>
                      </Link>
                    </div>
                  ))}
                </div>
              )}

              {filteredFreelancers.length > 6 && (
                <div className="view-all-container">
                  <Link to="/freelancers" className="view-all-link">
                    View all {filteredFreelancers.length} freelancers
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* Call to Action */}
          <div className="cta-container">
            <h2>Are you a freelancer?</h2>
            <p>Join our platform and let clients find you. Create your freelancer pin today!</p>
            <Link to="/create">
              <button className="create-pin-button">Create Your Pin</button>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;