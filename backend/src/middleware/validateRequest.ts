import { Request, Response, NextFunction } from 'express';
import { validateFreelancerForm } from '../utils/validators';

export const validateFreelancer = (req: Request, res: Response, next: NextFunction) => {
  const errors = validateFreelancerForm(req.body);
  if (errors.length > 0) return res.status(400).json({ errors });
  next();
};