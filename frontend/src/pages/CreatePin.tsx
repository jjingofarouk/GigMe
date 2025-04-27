// CreatePin.tsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createFreelancer } from '../services/api';
import Button from '../components/Button';

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, index?: number) => {
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
    setCurrentStep(prev => Math.min(prev + 1, totalSteps));
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  return (
    <div className="max-w-3xl mx-auto py-12 px-4">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold text-gray-900">Create Your Freelancer Profile</h1>
        <p className="mt-2 text-gray-600">Let clients find you on the map and connect with your services</p>
      </div>
      
      {/* Progress Bar */}
      <div className="mb-10">
        <div className="flex justify-between mb-2">
          {Array.from({ length: totalSteps }).map((_, index) => (
            <div key={index} className="flex flex-col items-center">
              <div className={`w-8 h-8 flex items-center justify-center rounded-full font-medium ${
                currentStep > index + 1 
                  ? 'bg-indigo-600 text-white' 
                  : currentStep === index + 1 
                    ? 'bg-indigo-600 text-white' 
                    : 'bg-gray-200 text-gray-700'
              }`}>
                {index + 1}
              </div>
              <span className="text-xs mt-1 text-gray-500">
                {index === 0 ? 'Basic Info' : index === 1 ? 'Skills' : 'Location'}
              </span>
            </div>
          ))}
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div 
            className="bg-indigo-600 h-2.5 rounded-full transition-all duration-300" 
            style={{ width: `${(currentStep / totalSteps) * 100}%` }}
          ></div>
        </div>
      </div>
      
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-6">
          {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-lg p-8">
        {/* Step 1: Basic Information */}
        {currentStep === 1 && (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-6">Basic Information</h2>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="John Doe"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Short Bio</label>
              <textarea
                name="blurb"
                value={formData.blurb}
                onChange={handleChange}
                rows={3}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Describe yourself and your services in a few sentences"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Contact Information</label>
              <input
                type="text"
                name="contact"
                value={formData.contact}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Email or phone number"
                required
              />
              <p className="text-xs text-gray-500 mt-1">This will be visible to users who view your profile</p>
            </div>
            
            <div className="pt-4 flex justify-end">
              <Button onClick={nextStep}>
                Continue
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                </svg>
              </Button>
            </div>
          </div>
        )}
        
        {/* Step 2: Skills */}
        {currentStep === 2 && (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-6">Your Top Skills</h2>
            
            <div className="space-y-4">
              {formData.bestThings.map((thing, index) => (
                <div key={index}>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Skill {index + 1}
                  </label>
                  <input
                    type="text"
                    value={thing}
                    onChange={(e) => handleChange(e, index)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder={`e.g. ${index === 0 ? 'Web Design' : index === 1 ? 'Logo Creation' : 'Social Media Marketing'}`}
                    required
                  />
                </div>
              ))}
            </div>
            
            <div className="pt-4 flex justify-between">
              <Button variant="outline" onClick={prevStep}>
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
                </svg>
                Back
              </Button>
              <Button onClick={nextStep}>
                Continue
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                </svg>
              </Button>
            </div>
          </div>
        )}
        
        {/* Step 3: Location */}
        {currentStep === 3 && (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-6">Your Location</h2>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Location Name</label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="City, Country"
                required
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Latitude</label>
                <input
                  type="number"
                  name="latitude"
                  value={formData.latitude}
                  onChange={handleChange}
                  step="any"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="e.g. 40.7128"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Longitude</label>
                <input
                  type="number"
                  name="longitude"
                  value={formData.longitude}
                  onChange={handleChange}
                  step="any"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="e.g. -74.0060"
                  required
                />
              </div>
            </div>
            
            <div className="bg-gray-100 p-4 rounded-lg">
              <div className="flex items-center text-sm text-gray-600 mb-2">
                <svg className="w-5 h-5 mr-2 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                <span>How to find your coordinates?</span>
              </div>
              <p className="text-xs text-gray-500">
                You can find your coordinates by right-clicking on your location in Google Maps and selecting "What's here?". The coordinates will appear at the bottom of the screen.
              </p>
            </div>
            
            <div className="pt-4 flex justify-between">
              <Button variant="outline" onClick={prevStep}>
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
                </svg>
                Back
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Creating...
                  </>
                ) : (
                  <>
                    Create Pin
                    <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
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