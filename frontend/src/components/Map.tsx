// Map.tsx
import { MapContainer, TileLayer, Marker, Popup, ZoomControl } from 'react-leaflet';
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

interface MapProps {
  height?: string;
  showControls?: boolean;
  initialCenter?: [number, number];
  initialZoom?: number;
  markers?: Freelancer[];
}

const Map: React.FC<MapProps> = ({ 
  height = '500px',
  showControls = true,
  initialCenter = [20, 0],
  initialZoom = 2,
  markers
}) => {
  const [freelancers, setFreelancers] = useState<Freelancer[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // If markers are provided as props, use them
    if (markers) {
      setFreelancers(markers);
      setLoading(false);
      return;
    }

    // Otherwise fetch from API
    const fetchFreelancers = async () => {
      try {
        const data = await getFreelancers();
        setFreelancers(data);
      } catch (error) {
        console.error('Error fetching freelancers:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchFreelancers();
  }, [markers]);

  const markerIcon = new L.Icon({
    iconUrl: '/map-marker.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
  });

  if (loading) {
    return (
      <div className={`bg-gray-100 rounded-lg flex items-center justify-center`} style={{ height }}>
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <MapContainer 
      center={initialCenter} 
      zoom={initialZoom} 
      style={{ height, width: '100%' }}
      zoomControl={false} // We'll add our own zoom control in a custom position
      className="rounded-lg shadow-md z-0"
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      
      {showControls && <ZoomControl position="bottomright" />}
      
      {freelancers.map((freelancer) => (
        <Marker
          key={freelancer.id}
          position={[freelancer.latitude, freelancer.longitude]}
          icon={markerIcon}
        >
          <Popup className="custom-popup">
            <div className="text-center p-1">
              <h3 className="font-bold text-gray-900 mb-1">{freelancer.name}</h3>
              <p className="text-sm text-gray-500 mb-2">{freelancer.location}</p>
              <p className="text-sm text-gray-700 mb-3 line-clamp-2">{freelancer.blurb}</p>
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
  );
};

export default Map;