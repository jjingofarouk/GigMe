import axios from 'axios';

   const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

   const api = axios.create({
     baseURL: API_URL,
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