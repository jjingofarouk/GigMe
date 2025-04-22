import { Freelancer } from '../types';

interface ProfileProps {
  freelancer: Freelancer;
}

const Profile: React.FC<ProfileProps> = ({ freelancer }) => {
  return (
    <div className="p-4 max-w-lg mx-auto">
      <img
        src="/profile-placeholder.jpg"
        alt={freelancer.name}
        className="w-32 h-32 rounded-full mx-auto"
      />
      <h2 className="text-2xl font-bold text-center">{freelancer.name}</h2>
      <p className="text-center">{freelancer.blurb}</p>
      <h3 className="font-bold mt-4">Best Things</h3>
      <ul className="list-disc pl-5">
        {freelancer.bestThings.map((thing, index) => (
          <li key={index}>{thing}</li>
        ))}
      </ul>
      <p className="mt-4"><strong>Location:</strong> {freelancer.location}</p>
      <p><strong>Contact:</strong> {freelancer.contact}</p>
    </div>
  );
};

export default Profile;