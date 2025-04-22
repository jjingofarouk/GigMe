import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getFreelancer } from '../services/api';
import Profile from '../components/Profile';
import { Freelancer } from '../types';

const FreelancerProfile: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [freelancer, setFreelancer] = useState<Freelancer | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFreelancer = async () => {
      try {
        const data = await getFreelancer(id!);
        setFreelancer(data);
      } catch (err) {
        setError('Failed to load freelancer');
      } finally {
        setLoading(false);
      }
    };
    fetchFreelancer();
  }, [id]);

  if (loading) return <img src="/loading-spinner.gif" alt="Loading" className="mx-auto mt-20" />;
  if (error || !freelancer) return <div className="text-center mt-20"><img src="/error-icon.png" alt="Error" className="mx-auto" /><p>{error || 'Freelancer not found'}</p></div>;

  return <Profile freelancer={freelancer} />;
};

export default FreelancerProfile;