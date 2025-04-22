import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getFreelancers = async (req: Request, res: Response) => {
  const freelancers = await prisma.freelancer.findMany();
  res.json(freelancers);
};

export const getFreelancer = async (req: Request, res: Response) => {
  const { id } = req.params;
  const freelancer = await prisma.freelancer.findUnique({ where: { id } });
  if (!freelancer) return res.status(404).json({ error: 'Freelancer not found' });
  res.json(freelancer);
};

export const createFreelancer = async (req: Request, res: Response) => {
  const { name, blurb, bestThings, location, contact, latitude, longitude } = req.body;
  if (bestThings.length !== 3) return res.status(400).json({ error: "Please provide 3 'best things'" });

  const freelancer = await prisma.freelancer.create({
    data: { name, blurb, bestThings, location, contact, latitude, longitude },
  });
  res.json(freelancer);
};