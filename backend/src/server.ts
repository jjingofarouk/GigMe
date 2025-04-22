import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import freelancerRoutes from './routes/freelancers';
import healthRoutes from './routes/health';
import { errorHandler } from './middleware/errorHandler';

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

app.use('/freelancers', freelancerRoutes);
app.use('/health', healthRoutes);

app.use(errorHandler);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));