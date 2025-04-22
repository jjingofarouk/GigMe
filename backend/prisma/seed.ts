import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.freelancer.deleteMany(); // Clear existing data to avoid duplicates
  await prisma.freelancer.createMany({
    data: [
      {
        name: 'Aisha Khan',
        blurb: 'Full-stack developer specializing in scalable web apps',
        bestThings: ['JavaScript', 'Express', 'MongoDB'],
        location: 'Karachi, Pakistan',
        contact: 'aisha.khan@example.com',
        latitude: 24.8607,
        longitude: 67.0011,
      },
      {
        name: 'Carlos Mendes',
        blurb: 'Mobile app developer with a focus on cross-platform solutions',
        bestThings: ['Flutter', 'Dart', 'Firebase'],
        location: 'São Paulo, Brazil',
        contact: 'carlos.mendes@example.com',
        latitude: -23.5505,
        longitude: -46.6333,
      },
      {
        name: 'Mei Lin',
        blurb: 'Data scientist with expertise in machine learning models',
        bestThings: ['Python', 'TensorFlow', 'Pandas'],
        location: 'Shanghai, China',
        contact: 'mei.lin@example.com',
        latitude: 31.2304,
        longitude: 121.4737,
      },
      {
        name: 'Tunde Adebayo',
        blurb: 'Cybersecurity expert securing cloud infrastructures',
        bestThings: ['AWS', 'Penetration Testing', 'SIEM'],
        location: 'Lagos, Nigeria',
        contact: 'tunde.adebayo@example.com',
        latitude: 6.5244,
        longitude: 3.3792,
      },
      {
        name: 'Sophie Dubois',
        blurb: 'Graphic designer creating stunning brand visuals',
        bestThings: ['Adobe Illustrator', 'Photoshop', 'Canva'],
        location: 'Paris, France',
        contact: 'sophie.dubois@example.com',
        latitude: 48.8566,
        longitude: 2.3522,
      },
      {
        name: 'Rahul Sharma',
        blurb: 'DevOps engineer optimizing CI/CD pipelines',
        bestThings: ['Docker', 'Kubernetes', 'Jenkins'],
        location: 'Bengaluru, India',
        contact: 'rahul.sharma@example.com',
        latitude: 12.9716,
        longitude: 77.5946,
      },
      {
        name: 'Emma Wilson',
        blurb: 'Product manager driving agile development',
        bestThings: ['Scrum', 'Jira', 'User Stories'],
        location: 'Sydney, Australia',
        contact: 'emma.wilson@example.com',
        latitude: -33.8688,
        longitude: 151.2093,
      },
      {
        name: 'Hiroshi Tanaka',
        blurb: 'Game developer crafting immersive experiences',
        bestThings: ['Unity', 'C#', 'Unreal Engine'],
        location: 'Tokyo, Japan',
        contact: 'hiroshi.tanaka@example.com',
        latitude: 35.6762,
        longitude: 139.6503,
      },
      {
        name: 'Fatima Al-Mansoori',
        blurb: 'AI researcher advancing natural language processing',
        bestThings: ['PyTorch', 'NLP', 'Deep Learning'],
        location: 'Dubai, UAE',
        contact: 'fatima.mansoori@example.com',
        latitude: 25.2048,
        longitude: 55.2708,
      },
      {
        name: 'Liam O’Connor',
        blurb: 'Backend developer building robust APIs',
        bestThings: ['Go', 'PostgreSQL', 'GraphQL'],
        location: 'Dublin, Ireland',
        contact: 'liam.oconnor@example.com',
        latitude: 53.3498,
        longitude: -6.2603,
      },
    ],
  });
  console.log('Seeded database with 10 global freelancers');
}

main()
  .catch((e) => console.error(e))
  .finally(async () => await prisma.$disconnect());