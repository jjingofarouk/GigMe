import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { useEffect, useState } from 'react';
import { getFreelancers } from '../services/api';
import L from 'leaflet';
import { Link } from 'react-router-dom';

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

const Map: React.FC = () => {
  const [freelancers, setFreelancers] = useState<Freelancer[]>([]);

  useEffect(() => {
    const fetchFreelancers = async () => {
      try {
        const data = await getFreelancers();
        setFreelancers(data);
      } catch (error) {
        console.error('Error fetching freelancers:', error);
      }
    };
    fetchFreelancers();
  }, []);

  const markerIcon = new L.Icon({
    iconUrl: '/map-marker.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
  });

  return (
    <MapContainer center={[0, 0]} zoom={2} style={{ height: '500px', width: '100%' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {freelancers.map((freelancer) => (
        <Marker
          key={freelancer.id}
          position={[freelancer.latitude, freelancer.longitude]}
          icon={markerIcon}
        >
          <Popup>
            <div>
              <h3>{freelancer.name}</h3>
              <p>{freelancer.blurb}</p>
              <Link to={`/freelancer/${freelancer.id}`}>View Profile</Link>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default Map;