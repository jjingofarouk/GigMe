import { Link } from 'react-router-dom';
import { Freelancer } from '../types';

interface PinCardProps {
  freelancer: Freelancer;
}

const PinCard: React.FC<PinCardProps> = ({ freelancer }) => {
  return (
    <div className="p-4 bg-white rounded shadow">
      <h3 className="text-lg font-bold">{freelancer.name}</h3>
      <p>{freelancer.blurb}</p>
      <Link to={`/freelancer/${freelancer.id}`} className="text-blue-500 hover:underline">
        View Profile
      </Link>
    </div>
  );
};

export default PinCard;