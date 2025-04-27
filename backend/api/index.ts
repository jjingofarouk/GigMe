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
  res.setHeader('Content-Type', 'text/html');
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>GigMap Backend API</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          line-height: 1.6;
          margin: 0;
          padding: 20px;
          background-color: #f4f4f4;
          color: #333;
        }
        .container {
          max-width: 800px;
          margin: 0 auto;
          background: #fff;
          padding: 20px;
          border-radius: 8px;
          box-shadow: 0 0 10px rgba(0,0,0,0.1);
        }
        h1 {
          color: #2c3e50;
        }
        h2 {
          color: #34495e;
        }
        pre {
          background: #f8f8f8;
          padding: 10px;
          border-radius: 4px;
          overflow-x: auto;
        }
        code {
          font-family: Consolas, monospace;
        }
        a {
          color: #3498db;
          text-decoration: none;
        }
        a:hover {
          text-decoration: underline;
        }
        .endpoint {
          margin-bottom: 20px;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <h1>Welcome to the GigMap Backend API</h1>
        <p>This is a RESTful API for managing freelancer data, including profiles and locations.</p>
        <p><strong>Base URL:</strong> <a href="https://gigmap-backend.vercel.app">https://gigmap-backend.vercel.app</a></p>
        <p><strong>Version:</strong> 1.0.0</p>

        <h2>Available Endpoints</h2>

        <div class="endpoint">
          <h3>GET /health</h3>
          <p>Check the health status of the API.</p>
          <p><strong>Example Request:</strong></p>
          <pre><code>curl https://gigmap-backend.vercel.app/health</code></pre>
          <p><strong>Example Response:</strong></p>
          <pre><code>{ "status": "OK" }</code></pre>
        </div>

        <div class="endpoint">
          <h3>GET /freelancers</h3>
          <p>Retrieve a list of all freelancers.</p>
          <p><strong>Example Request:</strong></p>
          <pre><code>curl https://gigmap-backend.vercel.app/freelancers</code></pre>
          <p><strong>Example Response:</strong></p>
          <pre><code>[
{
  "id": "1",
  "name": "Aisha Khan",
  "blurb": "Full-stack developer specializing in React and Node.js",
  "bestThings": ["React", "Node.js", "MongoDB"],
  "location": "Toronto, Canada",
  "contact": "aisha.khan@example.com",
  "latitude": 43.6532,
  "longitude": -79.3832
}