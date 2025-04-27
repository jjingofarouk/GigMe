import { Link } from 'react-router-dom';

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

interface PinCardProps {
  freelancer: Freelancer;
}

const PinCard: React.FC<PinCardProps> = ({ freelancer }) => {
  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow overflow-hidden border border-gray-100">
      <div className="p-5">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-lg font-bold text-gray-900">{freelancer.name}</h3>
            <p className="text-sm text-gray-500 mt-1">
              <span className="font-medium bg-gray-200 px-2 py-0.5 rounded">Location:</span>{' '}
              {freelancer.location}
            </p>
          </div>
          <div className="bg-indigo-100 text-indigo-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
            {new Date(freelancer.createdAt).toLocaleDateString()}
          </div>
        </div>

        <p className="mt-3 text-gray-600 line-clamp-2">{freelancer.blurb}</p>

        <div className="mt-4 flex flex-wrap gap-1">
          {freelancer.bestThings.map((skill, index) => (
            <span key={index} className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded">
              {skill}
            </span>
          ))}
        </div>

        <div className="mt-5 pt-4 border-t border-gray-100 flex justify-between items-center">
          <p className="text-sm text-gray-500">
            <span className="font-medium bg-gray-200 px-2 py-0.5 rounded">Contact:</span> Available
          </p>
          <Link
            to={`/freelancer/${freelancer.id}`}
            className="inline-flex items-center font-medium text-indigo-600 hover:text-indigo-800"
          >
            View Profile <span className="ml-1 font-bold">→</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PinCard;