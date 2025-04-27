import { useState } from 'react';
import { createFreelancer } from '../services/api';
import { useNavigate } from 'react-router-dom';
import Button from './Button';
import './PinForm.css';

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
    <form onSubmit={handleSubmit} className="pin-form">
      <div className="pin-form__field">
        <label className="pin-form__label">Name</label>
        <input
          type="text"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="pin-form__input"
          required
        />
      </div>
      <div className="pin-form__field">
        <label className="pin-form__label">Blurb</label>
        <textarea
          value={formData.blurb}
          onChange={(e) => setFormData({ ...formData, blurb: e.target.value })}
          className="pin-form__textarea"
          required
        />
      </div>
      <div className="pin-form__field">
        <label className="pin-form__label">Best Things (3)</label>
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
            className="pin-form__input pin-form__input--skill"
            required
          />
        ))}
      </div>
      <div className="pin-form__field">
        <label className="pin-form__label">Location</label>
        <input
          type="text"
          value={formData.location}
          onChange={(e) => setFormData({ ...formData, location: e.target.value })}
          className="pin-form__input"
          required
        />
      </div>
      <div className="pin-form__field">
        <label className="pin-form__label">Contact</label>
        <input
          type="text"
          value={formData.contact}
          onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
          className="pin-form__input"
          required
        />
      </div>
      <div className="pin-form__coords">
        <div className="pin-form__field">
          <label className="pin-form__label">Latitude</label>
          <input
            type="number"
            value={formData.latitude}
            onChange={(e) => setFormData({ ...formData, latitude: parseFloat(e.target.value) })}
            className="pin-form__input"
            required
          />
        </div>
        <div className="pin-form__field">
          <label className="pin-form__label">Longitude</label>
          <input
            type="number"
            value={formData.longitude}
            onChange={(e) => setFormData({ ...formData, longitude: parseFloat(e.target.value) })}
            className="pin-form__input"
            required
          />
        </div>
      </div>
      <Button type="submit">Create Pin</Button>
    </form>
  );
};

export default PinForm;