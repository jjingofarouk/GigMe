// Profile.tsx
import { Freelancer } from '../types';

interface ProfileProps {
  freelancer: Freelancer;
}

const Profile: React.FC<ProfileProps> = ({ freelancer }) => {
  return (
    <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
      <div className="md:flex">
        <div className="md:flex-shrink-0 bg-gradient-to-br from-indigo-500 to-purple-600 md:w-48 flex items-center justify-center p-8">
          <div className="relative w-32 h-32 rounded-full border-4 border-white overflow-hidden bg-white">
            <img
              src="/profile-placeholder.jpg"
              alt={freelancer.name}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
        
        <div className="p-8 w-full">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">{freelancer.name}</h2>
              <p className="flex items-center text-gray-600 mt-1">
                <svg className="w-5 h-5 mr-1 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                </svg>
                {freelancer.location}
              </p>
            </div>
            <div className="flex items-center">
              <button className="flex items-center justify-center text-sm bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors">
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                </svg>
                Contact
              </button>
            </div>
          </div>
          
          <div className="mt-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-gray-700 italic">{freelancer.blurb}</p>
            </div>
          </div>
          
          <div className="mt-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Skills & Expertise</h3>
            <div className="flex flex-wrap gap-2">
              {freelancer.bestThings.map((thing, index) => (
                <span key={index} className="bg-indigo-100 text-indigo-800 text-sm px-3 py-1 rounded-full">
                  {thing}
                </span>
              ))}
            </div>
          </div>
          
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="text-sm font-medium text-gray-500 mb-2">Contact Information</h4>
              <p className="text-gray-800">{freelancer.contact}</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="text-sm font-medium text-gray-500 mb-2">Member Since</h4>
              <p className="text-gray-800">{new Date(freelancer.createdAt).toLocaleDateString()}</p>
            </div>
          </div>
          
          <div className="mt-6 pt-4 border-t border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Location</h3>
            <div className="bg-gray-100 rounded-lg h-48 flex items-center justify-center">
              <p className="text-gray-500">Map preview showing: {freelancer.latitude}, {freelancer.longitude}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};