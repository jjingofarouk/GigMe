import { MapContainer, TileLayer, Marker, Popup, ZoomControl } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { useEffect, useState } from 'react';
import { getFreelancers } from '../services/api';
import L from 'leaflet';
import { Link } from 'react-router-dom';
import './Map.css';

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
    if (markers) {
      setFreelancers(markers);
      setLoading(false);
      return;
    }

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

  const markerIcon = new L.DivIcon({
    className: 'map__marker',
    html: '<span class="map__marker-dot">🔴</span>',
    iconSize: [20, 20],
    iconAnchor: [10, 10],
    popupAnchor: [0, -10],
  });

  if (loading) {
    return (
      <div className="map__loading" style={{ height }}>
        <div className="map__loading-spinner"></div>
      </div>
    );
  }

  return (
    <MapContainer
      center={initialCenter}
      zoom={initialZoom}
      style={{ height, width: '100%' }}
      zoomControl={false}
      className="map__container"
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, licensed under <a href="https://www.opendatacommons.org/licenses/odbl/">ODbL</a>'
      />
      
      {showControls && <ZoomControl position="bottomright" />}
      
      {freelancers.map((freelancer) => (
        <Marker
          key={freelancer.id}
          position={[freelancer.latitude, freelancer.longitude]}
          icon={markerIcon}
        >
          <Popup className="map__popup">
            <div className="map__popup-content">
              <h3 className="map__popup-title">{freelancer.name}</h3>
              <p className="map__popup-location">{freelancer.location}</p>
              <p className="map__popup-blurb">{freelancer.blurb}</p>
              <Link to={`/freelancer/${freelancer.id}`} className="map__popup-link">
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