import { useEffect } from 'react';
import Map from '../components/Map';
import { useFreelancers } from '../hooks/useFreelancers';
import { LatLngTuple } from 'leaflet';

const Home: React.FC = () => {
  const { freelancers, loading, error } = useFreelancers();
  const center: LatLngTuple = [51.505, -0.09]; // Default center (London)

  if (loading) return <img src="/loading-spinner.gif" alt="Loading" className="mx-auto mt-20" />;
  if (error) return <div className="text-center mt-20"><img src="/error-icon.png" alt="Error" className="mx-auto" /><p>Error loading freelancers</p></div>;

  return (
    <div className="bg-[url('/hero-bg.jpg')] bg-cover bg-center">
      <Map freelancers={freelancers} center={center} />
    </div>
  );
};

export default Home;