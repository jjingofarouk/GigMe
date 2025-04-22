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
    ],
  });
  console.log('Seeded database');
}

main()
  .catch((e) => console.error(e))
  .finally(async () => await prisma.$disconnect());