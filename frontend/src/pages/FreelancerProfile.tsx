// src/components/FreelancerProfile.tsx
import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getFreelancerById } from '../services/api';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import L from 'leaflet';
import Button from './Button';
import './FreelancerProfile.css';

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

  const markerIcon = L.divIcon({
    html: `
      <svg width="24" height="36" viewBox="0 0 24 36" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 0C5.373 0 0 5.373 0 12c0 10.667 12 24 12 24s12-13.333 12-24C24 5.373 18.627 0 12 0z" fill="#8b5cf6"/>
        <circle cx="12" cy="12" r="6" fill="#ffffff"/>
      </svg>
    `,
    className: '',
    iconSize: [24, 36],
    iconAnchor: [12, 36],
  });

  if (loading) {
    return (
      <div className="profile-loading">
        <div className="profile-loading__text">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="profile-error">
        <div className="profile-error__container">
          <div className="profile-error__message">{error}</div>
          <Link to="/">
            <Button>Return to Homepage</Button>
          </Link>
        </div>
      </div>
    );
  }

  if (!freelancer) {
    return (
      <div className="profile-not-found">
        <div className="profile-not-found__container">
          <div className="profile-not-found__message">Freelancer not found</div>
          <Link to="/">
            <Button>Return to Homepage</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="freelancer-profile">
      <div className="freelancer-profile__header">
        <div className="freelancer-profile__cover">
          <div className="freelancer-profile__avatar-container">
            <img
              src="/profile-placeholder.jpg"
              alt={freelancer.name}
              className="freelancer-profile__avatar"
            />
          </div>
        </div>

        <div className="freelancer-profile__info">
          <div className="freelancer-profile__info-main">
            <h1 className="freelancer-profile__name">{freelancer.name}</h1>
            <p className="freelancer-profile__location">
              <span className="freelancer-profile__location-label">Location:</span>{' '}
              {freelancer.location}
            </p>
          </div>

          <div className="freelancer-profile__actions">
            <a href={`mailto:${freelancer.contact}`} className="freelancer-profile__contact-button">
              Contact
            </a>
            <button className="freelancer-profile__save-button">Save</button>
          </div>
        </div>

        <div className="freelancer-profile__tabs">
          <button
            onClick={() => setActiveTab('about')}
            className={`freelancer-profile__tab ${activeTab === 'about' ? 'freelancer-profile__tab--active' : ''}`}
          >
            About
          </button>
          <button
            onClick={() => setActiveTab('portfolio')}
            className={`freelancer-profile__tab ${activeTab === 'portfolio' ? 'freelancer-profile__tab--active' : ''}`}
          >
            Portfolio
          </button>
          <button
            onClick={() => setActiveTab('reviews')}
            className={`freelancer-profile__tab ${activeTab === 'reviews' ? 'freelancer-profile__tab--active' : ''}`}
          >
            Reviews
          </button>
        </div>
      </div>

      <div className="freelancer-profile__content">
        {activeTab === 'about' && (
          <div className="freelancer-profile__about">
            <div className="freelancer-profile__main-content">
              <div className="freelancer-profile__section">
                <h2 className="freelancer-profile__section-title">About</h2>
                <p className="freelancer-profile__section-text">{freelancer.blurb}</p>
              </div>

              <div className="freelancer-profile__section">
                <h2 className="freelancer-profile__section-title">Skills & Expertise</h2>
                <div className="freelancer-profile__skills">
                  {freelancer.bestThings.map((thing, index) => (
                    <span key={index} className="freelancer-profile__skill">
                      {thing}
                    </span>
                  ))}
                </div>
              </div>

              <div className="freelancer-profile__section">
                <h2 className="freelancer-profile__section-title">Location</h2>
                <div className="freelancer-profile__map">
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

            <div className="freelancer-profile__sidebar">
              <div className="freelancer-profile__contact-info">
                <h2 className="freelancer-profile__section-title">Contact Information</h2>
                <div className="freelancer-profile__contact-details">
                  <div className="freelancer-profile__contact-item">
                    <p className="freelancer-profile__contact-label">Email/Phone</p>
                    <p className="freelancer-profile__contact-value">{freelancer.contact}</p>
                  </div>
                  <div className="freelancer-profile__contact-item">
                    <p className="freelancer-profile__contact-label">Member Since</p>
                    <p className="freelancer-profile__contact-value">
                      {new Date(freelancer.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="freelancer-profile__contact-item">
                    <p className="freelancer-profile__contact-label">Location</p>
                    <p className="freelancer-profile__contact-value">{freelancer.location}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'portfolio' && (
          <div className="freelancer-profile__portfolio">
            <div className="freelancer-profile__empty-state">
              <h3 className="freelancer-profile__empty-title">No portfolio items yet</h3>
              <p className="freelancer-profile__empty-text">
                This freelancer hasn't added any portfolio items.
              </p>
            </div>
          </div>
        )}

        {activeTab === 'reviews' && (
          <div className="freelancer-profile__reviews">
            <div className="freelancer-profile__empty-state">
              <h3 className="freelancer-profile__empty-title">No reviews yet</h3>
              <p className="freelancer-profile__empty-text">
                This freelancer hasn't received any reviews yet.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FreelancerProfile;