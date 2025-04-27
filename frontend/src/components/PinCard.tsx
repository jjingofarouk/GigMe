/* src/components/PinCard.tsx */
import { Link } from ‘react-router-dom’; import ‘./PinCard.css’;
interface Freelancer { id: string; name: string; blurb: string; bestThings: string[]; location: string; contact: string; latitude: number; longitude: number; createdAt: string; }
interface PinCardProps { freelancer: Freelancer; }
const PinCard: React.FC = ({ freelancer }) => { return (
{freelancer.name}
Location: {freelancer.location}
{new Date(freelancer.createdAt).toLocaleDateString()}

    
{freelancer.blurb}

    
      {freelancer.bestThings.map((skill, index) => (
        
          {skill}
        
      ))}
    

    
      
        Contact: Available
      
      
        View Profile →
      
    
  
); };
export default PinCard;
