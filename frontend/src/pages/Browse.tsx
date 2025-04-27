// src/pages/Browse.tsx
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import { getFreelancers } from '../services/api';
import Button from '../components/Button';
import './Browse.css';

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

const Browse: React.FC = () => {
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
    html: `
      <svg width="24" height="36" viewBox="0 0 24 36" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 0C5.373 0 0 5.373 0 12c0 10.667 12 24 12 24s12-13.333 12-24C24 5.373 18.627 0 12 0z" fill="#2C6E6B"/>
        <circle cx="12" cy="12" r="6" fill="#ffffff"/>
      </svg>
    `,
    className: '',
    iconSize: [24, 36],
    iconAnchor: [12, 36],
  });

  return (
    <div className="browse-container">
      <div className="browse-header">
        <div className="container">
          <h1>Browse Freelancers</h1>
          <p>Discover talented professionals for your projects</p>
          <div className="search-container">
            <input
              type="text"
              placeholder="Search by name, skill, or location..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              aria-label="Search freelancers"
            />
            <button className="search-button" aria-label="Search">
              Search
            </button>
          </div>
        </div>
      </div>

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

        <div className="browse-content">
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
                {filteredFreelancers.map(freelancer => (
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default Browse;