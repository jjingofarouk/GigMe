import { useState, useEffect } from 'react';
import { getFreelancers } from '../services/api';
import { Freelancer } from '../types';

export const useFreelancers = () => {
  const [freelancers, setFreelancers] = useState<Freelancer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFreelancers = async () => {
      try {
        const data = await getFreelancers();
        setFreelancers(data);
      } catch (err) {
        setError('Failed to load freelancers');
      } finally {
        setLoading(false);
      }
    };
    fetchFreelancers();
  }, []);

  return { freelancers, loading, error };
};