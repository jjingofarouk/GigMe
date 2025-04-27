import { Link } from 'react-router-dom';
import './PinCard.css';

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
    <div className="pin-card">
      <div className="pin-card__container">
        <div className="pin-card__header">
          <div>
            <h3 className="pin-card__title">{freelancer.name}</h3>
            <div className="pin-card__meta">
              <p className="pin-card__location">
                <span className="pin-card__location-label">Location:</span> {freelancer.location}
              </p>
              <p className="pin-card__date">
                <span className="pin-card__date-label">Joined:</span> {new Date(freelancer.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>

        <p className="pin-card__blurb">{freelancer.blurb}</p>

        <div className="pin-card__skills">
          {freelancer.bestThings.map((skill, index) => (
            <span key={index} className="pin-card__skill">{skill}</span>
          ))}
        </div>

        <div className="pin-card__footer">
          <p className="pin-card__contact">
            <span className="pin-card__contact-label">Contact:</span> {freelancer.contact}
          </p>
          <Link to={`/freelancer/${freelancer.id}`} className="pin-card__link">
            View Profile <span className="pin-card__link-arrow">→</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PinCard;