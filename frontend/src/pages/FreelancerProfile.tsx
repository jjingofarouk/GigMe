import { useEffect, useState } from 'react';
   import { useParams } from 'react-router-dom';
   import { getFreelancerById } from '../services/api';

   const FreelancerProfile: React.FC = () => {
     const { id } = useParams<{ id: string }>();
     const [freelancer, setFreelancer] = useState<any>(null);
     const [error, setError] = useState('');

     useEffect(() => {
       const fetchFreelancer = async () => {
         try {
           const data = await getFreelancerById(id!);
           setFreelancer(data);
         } catch (err: any) {
           setError(err.response?.data?.error || 'Failed to load freelancer');
         }
       };
       fetchFreelancer();
     }, [id]);

     if (error) return <div className="text-red-500">{error}</div>;
     if (!freelancer) return <div>Loading...</div>;

     return (
       <div className="container mx-auto p-4">
         <h1 className="text-2xl font-bold">{freelancer.name}</h1>
         <p>{freelancer.blurb}</p>
         <p><strong>Location:</strong> {freelancer.location}</p>
         <p><strong>Contact:</strong> {freelancer.contact}</p>
         <p><strong>Skills:</strong> {freelancer.bestThings.join(', ')}</p>
         <p><strong>Coordinates:</strong> {freelancer.latitude}, {freelancer.longitude}</p>
       </div>
     );
   };

   export default FreelancerProfile;