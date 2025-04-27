import axios from 'axios';

const api = axios.create({
  baseURL: 'https://gigmap-backend.vercel.app',
});

export const getFreelancers = async () => {
  const response = await api.get('/freelancers');
  return response.data;
};

export const getFreelancerById = async (id: string) => {
  const response = await api.get(`/freelancers/${id}`);
  return response.data;
};

export const createFreelancer = async (data: {
  name: string;
  blurb: string;
  bestThings: string[];
  location: string;
  contact: string;
  latitude: number;
  longitude: number;
}) => {
  const response = await api.post('/freelancers', data);
  return response.data;
};