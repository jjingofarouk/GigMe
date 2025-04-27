import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createFreelancer } from '../services/api';
import Button from '../components/Button'; // Default import is correct
import './CreatePin.css'; // Import the external CSS

const CreatePin: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    blurb: '',
    bestThings: ['', '', ''],
    location: '',
    contact: '',
    latitude: 0,
    longitude: 0,
  });
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 3;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    index?: number
  ) => {
    if (index !== undefined) {
      const newBestThings = [...formData.bestThings];
      newBestThings[index] = e.target.value;
      setFormData({ ...formData, bestThings: newBestThings });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsSubmitting(true);
      await createFreelancer({
        ...formData,
        latitude: Number(formData.latitude),
        longitude: Number(formData.longitude),
      });
      navigate('/');
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to create freelancer');
    } finally {
      setIsSubmitting(false);
    }
  };

  const nextStep = () => {
    setCurrentStep((prev) => Math.min(prev + 1, totalSteps));
  };

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  return (
    <div className="create-pin-container">
      <div className="create-pin-header">
        <h1>Create Your Freelancer Profile</h1>
        <p>Let clients find you on the map and connect with your services</p>
      </div>

      {/* Progress Bar */}
      <div className="progress-bar">
        <div className="progress-steps">
          {Array.from({ length: totalSteps }).map((_, index) => (
            <div key={index} className="progress-step">
              <div
                className={`step-indicator ${
                  currentStep > index + 1
                    ? 'completed'
                    : currentStep === index + 1
                    ? 'active'
                    : 'inactive'
                }`}
              >
                {index + 1}
              </div>
              <span className="step-label">
                {index === 0 ? 'Basic Info' : index === 1 ? 'Skills' : 'Location'}
              </span>
            </div>
          ))}
        </div>
        <div className="progress-bar-track">
          <div
            className="progress-bar-fill"
            style={{ width: `${(currentStep / totalSteps) * 100}%` }}
          ></div>
        </div>
      </div>

      {error && <div className="error-message">{error}</div>}

      <form onSubmit={handleSubmit} className="create-pin-form">
        {/* Step 1: Basic Information */}
        {currentStep === 1 && (
          <div className="form-section">
            <h2>Basic Information</h2>

            <div className="form-group">
              <label>Full Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="John Doe"
                required
              />
            </div>

            <div className="form-group">
              <label>Short Bio</label>
              <textarea
                name="blurb"
                value={formData.blurb}
                onChange={handleChange}
                rows={3}
                placeholder="Describe yourself and your services in a few sentences"
                required
              />
            </div>

            <div className="form-group">
              <label>Contact Information</label>
              <input
                type="text"
                name="contact"
                value={formData.contact}
                onChange={handleChange}
                placeholder="Email or phone number"
                required
              />
              <p>This will be visible to users who view your profile</p>
            </div>

            <div className="button-container">
              <Button className="create-pin-button" onClick={nextStep}>
                Continue <span className="button-icon">→</span>
              </Button>
            </div>
          </div>
        )}

        {/* Step 2: Skills */}
        {currentStep === 2 && (
          <div className="form-section">
            <h2>Your Top Skills</h2>

            <div className="form-group">
              {formData.bestThings.map((thing, index) => (
                <div key={index} className="form-group">
                  <label>Skill {index + 1}</label>
                  <input
                    type="text"
                    value={thing}
                    onChange={(e) => handleChange(e, index)}
                    placeholder={`e.g. ${
                      index === 0
                        ? 'Web Design'
                        : index === 1
                        ? 'Logo Creation'
                        : 'Social Media Marketing'
                    }`}
                    required
                  />
                </div>
              ))}
            </div>

            <div className="button-container">
              <Button className="back-button" variant="outline" onClick={prevStep}>
                <span className="button-icon">←</span> Back
              </Button>
              <Button className="create-pin-button" onClick={nextStep}>
                Continue <span className="button-icon">→</span>
              </Button>
            </div>
          </div>
        )}

        {/* Step 3: Location */}
        {currentStep === 3 && (
          <div className="form-section">
            <h2>Your Location</h2>

            <div className="form-group">
              <label>Location Name</label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="City, Country"
                required
              />
            </div>

            <div className="coordinates-grid">
              <div className="form-group">
                <label>Latitude</label>
                <input
                  type="number"
                  name="latitude"
                  value={formData.latitude}
                  onChange={handleChange}
                  step="any"
                  placeholder="e.g. 40.7128"
                  required
                />
              </div>
              <div className="form-group">
                <label>Longitude</label>
                <input
                  type="number"
                  name="longitude"
                  value={formData.longitude}
                  onChange={handleChange}
                  step="any"
                  placeholder="e.g. -74.0060"
                  required
                />
              </div>
            </div>

            <div className="info-box">
              <div className="info-title">How to find your coordinates?</div>
              <p>
                You can find your coordinates by right-clicking on your location in Google Maps and
                selecting "What's here?". The coordinates will appear at the bottom of the screen.
              </p>
            </div>

            <div className="button-container">
              <Button className="back-button" variant="outline" onClick={prevStep}>
                <span className="button-icon">←</span> Back
              </Button>
              <Button
                className="create-pin-button"
                type="submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <span className="loading-indicator animate-pulse">...</span> Creating...
                  </>
                ) : (
                  <>
                    Create Pin <span className="button-icon">✓</span>
                  </>
                )}
              </Button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
};

export default CreatePin;