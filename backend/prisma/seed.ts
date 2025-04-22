import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.freelancer.createMany({
    data: [
      {
        name: 'John Doe',
        blurb: 'Experienced web developer',
        bestThings: ['React', 'Node.js', 'TypeScript'],
        location: 'London',
        contact: 'john@example.com',
        latitude: 51.505,
        longitude: -0.09,
      },
      {
        name: 'Jane Smith',
        blurb: 'UI/UX Designer',
        bestThings: ['Figma', 'Sketch', 'Prototyping'],
        location: 'New York',
        contact: 'jane@example.com',
        latitude: 40.7128,
        longitude: -74.0060,
      },
    ],
  });
  console.log('Seeded database');
}

main()
  .catch((e) => console.error(e))
  .finally(async () => await prisma.$disconnect());