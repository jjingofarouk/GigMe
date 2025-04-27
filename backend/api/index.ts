import express from 'express';
import cors from 'cors';
import freelancerRoutes from '../src/routes/freelancers';
import { healthCheck } from '../src/controllers/healthController';

const app = express();

app.use(cors());
app.use(express.json());
app.use('/freelancers', freelancerRoutes);
app.get('/health', healthCheck);
app.get('/', (_req, res) => {
  res.json({
    message: 'Welcome to the GigMap Backend API',
    description: 'A RESTful API for managing freelancer data, including profiles and locations.',
    version: '1.0.0',
    endpoints: [
      {
        path: '/health',
        method: 'GET',
        description: 'Check the health status of the API.',
        exampleRequest: 'GET /health',
        exampleResponse: {
          status: 'OK',
        },
      },
      {
        path: '/freelancers',
        method: 'GET',
        description: 'Retrieve a list of all freelancers.',
        exampleRequest: 'GET /freelancers',
        exampleResponse: [
          {
            id: '1',
            name: 'Aisha Khan',
            blurb: 'Full-stack developer specializing in React and Node.js',
            bestThings: ['React', 'Node.js', 'MongoDB'],
            location: 'Toronto, Canada',
            contact: 'aisha.khan@example.com',
            latitude: 43.6532,
            longitude: -79.3832,
          },
        ],
      },
      {
        path: '/freelancers/:id',
        method: 'GET',
        description: 'Retrieve a specific freelancer by ID.',
        exampleRequest: 'GET /freelancers/1',
        exampleResponse: {
          id: '1',
          name: 'Aisha Khan',
          blurb: 'Full-stack developer specializing in React and Node.js',
          bestThings: ['React', 'Node.js', 'MongoDB'],
          location: 'Toronto, Canada',
          contact: 'aisha.khan@example.com',
          latitude: 43.6532,
          longitude: -79.3832,
        },
      },
      {
        path: '/freelancers',
        method: 'POST',
        description: 'Create a new freelancer profile.',
        exampleRequest: {
          url: 'POST /freelancers',
          body: {
            name: 'John Doe',
            blurb: 'Frontend developer',
            bestThings: ['React', 'TypeScript'],
            location: 'New York, USA',
            contact: 'john.doe@example.com',
            latitude: 40.7128,
            longitude: -74.0060,
          },
        },
        exampleResponse: {
          id: '2',
          name: 'John Doe',
          blurb: 'Frontend developer',
          bestThings: ['React', 'TypeScript'],
          location: 'New York, USA',
          contact: 'john.doe@example.com',
          latitude: 40.7128,
          longitude: -74.0060,
        },
      },
    ],
    usage: {
      baseUrl: 'https://gigmap-backend.vercel.app',
      exampleCurl: {
        getFreelancers: 'curl https://gigmap-backend.vercel.app/freelancers',
        createFreelancer: `curl -X POST https://gigmap-backend.vercel.app/freelancers \
-H "Content-Type: application/json" \
-d '{"name":"John Doe","blurb":"Frontend developer","bestThings":["React","TypeScript"],"location":"New York, USA","contact":"john.doe@example.com","latitude":40.7128,"longitude":-74.0060}'`,
      },
      exampleAxios: {
        getFreelancers: `axios.get('https://gigmap-backend.vercel.app/freelancers')
.then(response => console.log(response.data));`,
        createFreelancer: `axios.post('https://gigmap-backend.vercel.app/freelancers', {
  name: 'John Doe',
  blurb: 'Frontend developer',
  bestThings: ['React', 'TypeScript'],
  location: 'New York, USA',
  contact: 'john.doe@example.com',
  latitude: 40.7128,
  longitude: -74.0060
})
.then(response => console.log(response.data));`,
      },
    },
    documentation: 'For more details, contact the GigMap team at support@gigmap.example.com',
  });
});

export default app;