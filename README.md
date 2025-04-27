# GigMap

![GigMap Home](/assets/projects-screenshots/gigmap/home.png)

**GigMap** is a full-stack Progressive Web App (PWA) that revolutionizes freelance networking by connecting clients with talented freelancers worldwide through an interactive, map-driven platform. Built with a modern tech stack, GigMap leverages **React 19**, **TypeScript**, **Node.js**, **Express**, **Prisma**, and **OpenStreetMap** to deliver a scalable, mobile-first solution. Freelancers can pin their services on a dynamic map, showcase their skills, and engage with clients seamlessly, while clients can discover talent using advanced search and filtering tools. With a vibrant, gradient-driven UI and robust backend, GigMap empowers users in a competitive digital marketplace.

**[Live Demo](https://gigmap.vercel.app)** | **[GitHub Repository](https://github.com/jjingofarouk/gigmap)**

## Table of Contents

- [Features](#features)
- [Screenshots](#screenshots)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Usage](#usage)
- [Development Process](#development-process)
- [Skills Demonstrated](#skills-demonstrated)
- [Challenges and Solutions](#challenges-and-solutions)
- [Future Enhancements](#future-enhancements)
- [License](#license)
- [Contact](#contact)

## Features

GigMap combines cutting-edge technology with a user-centric design to provide a seamless experience for freelancers and clients. Key features include:

- **Interactive Map**: Powered by **React-Leaflet 5.0.0** and **OpenStreetMap**, users can explore freelancers' locations with custom SVG markers (teal pins with `#2C6E6B` fill) and smooth zoom/pan controls.
- **Dynamic Profiles**: Freelancer profiles feature tabbed navigation (About, Portfolio, Reviews), gradient headers, skill tags, and embedded maps, built with **React Router 7.5.1**.
- **Multi-Step Profile Creation**: A three-step form for freelancers to input details, skills, and geolocation, with real-time validation and a progress bar styled in teal-orange gradients (`#2C6E6B` to `#E76F51`).
- **Advanced Search & Filters**: Search by name, skill, or location, with category filters and a responsive search bar, powered by **Axios 1.8.4** API calls.
- **Responsive Design**: Mobile-first PWA with offline support, ensuring accessibility across devices using modern CSS and media queries.
- **Contact Integration**: Integrated contact form with email links and a "Save" feature, styled with WCAG-compliant accessibility.
- **Robust Error Handling**: Custom 404 page with a branded "Back to Homepage" button for invalid routes.
- **Secure Backend**: **Node.js**, **Express**, and **Prisma** manage data, with a seeding script (`seed.ts`) for initial database population.
- **OpenStreetMap Compliance**: Adheres to the **Open Database License (ODbL)** with proper attribution.

## Screenshots

Below are key screenshots showcasing GigMap's features and design:

### Home Page
![Home Page](/assets/projects-screenshots/gigmap/home.png)

### Freelancer Profile
![Freelancer Profile](/assets/projects-screenshots/gigmap/freelancer-profile.png)

### Create Pin (Step 1)
![Create Pin Step 1](/assets/projects-screenshots/gigmap/create-pin1.png)

### Create Pin (Step 2)
![Create Pin Step 2](/assets/projects-screenshots/gigmap/create-pin2.png)

### Create Pin (Step 3)
![Create Pin Step 3](/assets/projects-screenshots/gigmap/create-pin3.png)

### Create Pin (Success)
![Create Pin Success](/assets/projects-screenshots/gigmap/create-pin4.png)

### Map View
![Map View](/assets/projects-screenshots/gigmap/map-view.png)

### Search Filters
![Search Filters](/assets/projects-screenshots/gigmap/search-filters.png)

### Skills Display
![Skills Display](/assets/projects-screenshots/gigmap/skills-display.png)

### Contact Form
![Contact Form](/assets/projects-screenshots/gigmap/contact-form.png)

### 404 Not Found
![Not Found](/assets/projects-screenshots/gigmap/not-found.png)

## Tech Stack

### Frontend
- **React 19**
- **TypeScript 5.7.2**
- **React Router 7.5.1**
- **React-Leaflet 5.0.0**
- **Axios 1.8.4**
- **Vite 6.3.1**
- **ESLint 9.22.0**
- **CSS**

### Backend
- **Node.js**
- **Express 4.21.2**
- **Prisma 4.16.2**
- **CORS 2.8.5**
- **dotenv 16.5.0**
- **ts-node 10.9.2**

### Deployment
- **Vercel**
- **GitHub**

## Project Structure

```plaintext
gigmap/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── styles/
│   │   ├── assets/
│   │   ├── App.tsx
│   │   └── main.tsx
│   ├── package.json
│   ├── vite.config.ts
│   ├── tsconfig.json
│   └── eslint.config.js
├── gigmap-backend/
│   ├── api/
│   ├── prisma/
│   ├── package.json
│   └── tsconfig.json

Installation

Prerequisites

	•	Node.js (>=18.x)
	•	npm (>=9.x)
	•	PostgreSQL
	•	Git

Frontend Setup

git clone https://github.com/jjingofarouk/gigmap.git
cd gigmap/frontend
npm install
npm run dev

Backend Setup

cd gigmap/gigmap-backend
npm install
# Setup .env with your database URL
npm run prisma:generate
npm run prisma:migrate
npm run seed
npm run dev

Usage

	•	Explore freelancers on the map
	•	Browse profiles
	•	Create your freelance profile
	•	Contact freelancers

Development Process

	•	Vite for fast builds
	•	React 19 with hooks
	•	TypeScript for type safety
	•	Express + Prisma backend
	•	OpenStreetMap integration
	•	Full CI/CD with Vercel

Skills Demonstrated

	•	React, TypeScript, Node.js, Express, Prisma
	•	REST APIs
	•	OpenStreetMap integration
	•	Progressive Web App (PWA)
	•	Responsive design
	•	Accessibility (WCAG standards)

Challenges and Solutions

	•	Map Responsiveness: Dynamic sizing and container management
	•	Multi-Step Form State: Hook-based state management with TypeScript interfaces
	•	Performance Optimization: Debounced search, database indexing
	•	OSM Compliance: Attribution added properly
	•	Accessibility: ARIA labels, contrast colors

Future Enhancements

	•	Portfolio uploads
	•	Freelancer review system
	•	Real-time chat
	•	Advanced filtering and sorting
	•	Authentication
	•	Analytics dashboard
	•	Map clustering for performance

License

GigMap is licensed under the MIT License. OpenStreetMap data used under the Open Database License (ODbL).

Contact

	•	Email: jjingofaroukk@gmail.com
	•	Phone: +256 (751) 360-385
	•	Website: jjingofarouk.xyz
	•	GitHub: jjingofarouk

