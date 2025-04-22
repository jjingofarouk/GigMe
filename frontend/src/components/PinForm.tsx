import { useState } from 'react';
import { createFreelancer } from '../services/api';
import { useNavigate } from 'react-router-dom';
import Button from './Button';

const PinForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    blurb: '',
    bestThings: ['', '', ''],
    location: '',
    contact: '',
    latitude: 0,
    longitude: 0,
  });
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createFreelancer(formData);
      navigate('/');
    } catch (error) {
      console.error('Error creating pin:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 max-w-lg mx-auto">
      <div className="mb-4">
        <label className="block">Name</label>
        <input
          type="text"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="border p-2 w-full"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block">Blurb</label>
        <textarea
          value={formData.blurb}
          onChange={(e) => setFormData({ ...formData, blurb: e.target.value })}
          className="border p-2 w-full"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block">Best Things (3)</label>
        {formData.bestThings.map((thing, index) => (
          <input
            key={index}
            type="text"
            value={thing}
            onChange={(e) => {
              const newThings = [...formData.bestThings];
              newThings[index] = e.target.value;
              setFormData({ ...formData, bestThings: newThings });
            }}
            className="border p-2 w-full mb-2"
            required
          />
        ))}
      </div>
      <div className="mb-4">
        <label className="block">Location</label>
        <input
          type="text"
          value={formData.location}
          onChange={(e) => setFormData({ ...formData, location: e.target.value })}
          className="border p-2 w-full"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block">Contact</label>
        <input
          type="text"
          value={formData.contact}
          onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
          className="border p-2 w-full"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block">Latitude</label>
        <input
          type="number"
          value={formData.latitude}
          onChange={(e) => setFormData({ ...formData, latitude: parseFloat(e.target.value) })}
          className="border p-2 w-full"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block">Longitude</label>
        <input
          type="number"
          value={formData.longitude}
          onChange={(e) => setFormData({ ...formData, longitude: parseFloat(e.target.value) })}
          className="border p-2 w-full"
          required
        />
      </div>
      <Button type="submit">Create Pin</Button>
    </form>
  );
};

export default PinForm;