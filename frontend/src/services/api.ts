const BASE_URL = import.meta.env.VITE_API_URL || 'https://obscure-space-capybara-5g4jpq56rqww3vw77-3001.app.github.dev/';

export const getFreelancers = () =>
  fetch(`${BASE_URL}/freelancers`).then((res) => res.json());

export const getFreelancer = (id: string) =>
  fetch(`${BASE_URL}/freelancers/${id}`).then((res) => res.json());

export const createFreelancer = (data: any) =>
  fetch(`${BASE_URL}/freelancers`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  }).then((res) => res.json());