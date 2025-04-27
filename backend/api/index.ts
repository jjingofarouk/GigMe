

import express from 'express';
import cors from 'cors';
import freelancerRoutes from '../src/routes/freelancers';
import { healthCheck } from '../src/controllers/healthController';

const app = express();

app.use(cors());
app.use(express.json());
app.use('/freelancers', freelancerRoutes);
app.get('/health', healthCheck);
app.get('/', (_req, res) => res.json({ message: 'GigMap Backend API' }));

export default app;