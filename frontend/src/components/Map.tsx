import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { LatLngTuple } from 'leaflet';
import PinCard from './PinCard';
import { Freelancer } from '../types';

interface MapProps {
  freelancers: Freelancer[];
  center: LatLngTuple;
}

const Map: React.FC<MapProps> = ({ freelancers, center }) => {
  return (
    <MapContainer center={center} zoom={13} style={{ height: '100vh', width: '100%' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      />
      {freelancers.map((freelancer) => (
        <Marker key={freelancer.id} position={[freelancer.latitude, freelancer.longitude]}>
          <Popup>
            <PinCard freelancer={freelancer} />
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default Map;