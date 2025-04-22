import express from 'express';
import { getFreelancers, createFreelancer, getFreelancer } from '../controllers/freelancerController';
import { validateFreelancer } from '../middleware/validateRequest';

const router = express.Router();

router.get('/', getFreelancers);
router.post('/', validateFreelancer, createFreelancer);
router.get('/:id', getFreelancer);

export default router;