import express from 'express';
import cors from 'cors';
import freelancerRoutes from './routes/freelancers';

const app = express();

app.use(cors());
app.use(express.json());
app.use('/freelancers', freelancerRoutes);
app.get('/health', (_req, res) => res.json({ status: 'OK' }));
// Add root route
app.get('/', (_req, res) => res.json({ message: 'GigMap Backend API' }));

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});