# GigMap

![GigMap Home](https://github.com/jjingofarouk/portfol/blob/main/public/assets/projects-screenshots/gigmap/home.png?raw=true)

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
![Home Page](https://github.com/jjingofarouk/portfol/blob/main/public/assets/projects-screenshots/gigmap/home.png?raw=true)

### Freelancer Profile
![Freelancer Profile](https://github.com/jjingofarouk/portfol/blob/main/public/assets/projects-screenshots/gigmap/freelancer-profile.png?raw=true)

### Create Pin (Step 1)
![Create Pin Step 1](https://github.com/jjingofarouk/portfol/blob/main/public/assets/projects-screenshots/gigmap/create-pin1.png?raw=true)

### Create Pin (Step 2)
![Create Pin Step 2](https://github.com/jjingofarouk/portfol/blob/main/public/assets/projects-screenshots/gigmap/create-pin2.png?raw=true)

### Create Pin (Step 3)
![Create Pin Step 3](https://github.com/jjingofarouk/portfol/blob/main/public/assets/projects-screenshots/gigmap/create-pin3.png?raw=true)

### Create Pin (Success)
![Create Pin Success](https://github.com/jjingofarouk/portfol/blob/main/public/assets/projects-screenshots/gigmap/create-pin4.png?raw=true)

### Map View
![Map View](https://github.com/jjingofarouk/portfol/blob/main/public/assets/projects-screenshots/gigmap/map-view.png?raw=true)

### Search Filters
![Search Filters](https://github.com/jjingofarouk/portfol/blob/main/public/assets/projects-screenshots/gigmap/search-filters.png?raw=true)

### Skills Display
![Skills Display](https://github.com/jjingofarouk/portfol/blob/main/public/assets/projects-screenshots/gigmap/skills-display.png?raw=true)

### Contact Form
![Contact Form](https://github.com/jjingofarouk/portfol/blob/main/public/assets/projects-screenshots/gigmap/contact-form.png?raw=true)

### 404 Not Found
![Not Found](https://github.com/jjingofarouk/portfol/blob/main/public/assets/projects-screenshots/gigmap/not-found.png?raw=true)

## Tech Stack

### Frontend
- **React 19**: Component-based UI with modern hooks for state management.
- **TypeScript 5.7.2**: Type-safe development for robust code.
- **React Router 7.5.1**: Seamless client-side routing for navigation.
- **React-Leaflet 5.0.0**: Interactive maps with OpenStreetMap integration.
- **Axios 1.8.4**: HTTP requests to the backend API.
- **Vite 6.3.1**: Fast build tool for development and production.
- **ESLint 9.22.0**: Code linting with React Hooks and Refresh plugins.
- **CSS**: Custom styles with gradients (`#2C6E6B`, `#E76F51`, `#E9D8A6`), media queries, and a utility-first approach inspired by Tailwind CSS.

### Backend
- **Node.js**: Runtime for the server.
- **Express 4.21.2**: Lightweight framework for API endpoints.
- **Prisma 4.16.2**: ORM for database management (assumed PostgreSQL based on seeding).
- **CORS 2.8.5**: Cross-origin resource sharing for frontend-backend communication.
- **dotenv 16.5.0**: Environment variable management.
- **ts-node 10.9.2**: TypeScript execution for development.

### Deployment
- **Vercel**: Hosting for the frontend with CI/CD pipelines.
- **GitHub**: Version control and repository management.

## Project Structure

```plaintext
gigmap/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Button.tsx
│   │   │   ├── Header.tsx
│   │   │   └── Footer.tsx
│   │   ├── pages/
│   │   │   ├── Home.tsx
│   │   │   ├── Browse.tsx
│   │   │   ├── About.tsx
│   │   │   ├── Contact.tsx
│   │   │   ├── CreatePin.tsx
│   │   │   ├── FreelancerProfile.tsx
│   │   │   └── NotFound.tsx
│   │   ├── services/
│   │   │   └── api.ts
│   │   ├── styles/
│   │   │   ├── Home.css
│   │   │   ├── Browse.css
│   │   │   ├── About.css
│   │   │   ├── Contact.css
│   │   │   ├── FreelancerProfile.css
│   │   │   ├── Header.css
│   │   │   └── global.css
│   │   ├── assets/
│   │   │   └── projects-screenshots/gigmap/*.png
│   │   ├── App.tsx
│   │   └── main.tsx
│   ├── package.json
│   ├── vite.config.ts
│   ├── tsconfig.json
│   └── eslint.config.js
├── gigmap-backend/
│   ├── api/
│   │   └── index.ts
│   ├── prisma/
│   │   ├── schema.prisma
│   │   └── seed.ts
│   ├── package.json
│   └── tsconfig.json

Installation

Prerequisites

	•	Node.js (>=18.x)
	•	npm (>=9.x)
	•	PostgreSQL (or your database of choice, configured in schema.prisma)
	•	Git

Frontend Setup

	1.	Clone the repository:

git clone https://github.com/jjingofarouk/gigmap.git
cd gigmap/frontend


	2.	Install dependencies:

npm install


	3.	Start the development server:

npm run dev


	4.	Build for production:

npm run build


	5.	Preview the production build:

npm run preview



Backend Setup

	1.	Navigate to the backend directory:

cd gigmap/gigmap-backend


	2.	Install dependencies:

npm install


	3.	Set up environment variables in .env:

DATABASE_URL="postgresql://user:password@localhost:5432/gigmap?schema=public"
PORT=3001


	4.	Generate Prisma client:

npm run prisma:generate


	5.	Run database migrations:

npm run prisma:migrate


	6.	Seed the database:

npm run seed


	7.	Start the development server:

npm run dev


	8.	Build and start for production:

npm run build
npm start



Usage

	1.	Home Page: Explore freelancers on an interactive map or browse profiles via the search bar and category filters.
	2.	Browse Page: View all freelancers with map and list views, filtered by skills or search queries.
	3.	Freelancer Profile: Access detailed profiles with tabs for About, Portfolio, and Reviews, including contact options.
	4.	Create Pin: Freelancers can create profiles through a multi-step form, adding details, skills, and geolocation.
	5.	About Page: Learn about GigMap’s mission, features, and story.
	6.	Contact Page: Submit inquiries via a form or view contact details.
	7.	Navigation: Use the responsive header to access all pages, with a mobile menu for smaller screens.

Development Process

(continues with no changes from your original)

Skills Demonstrated

(continues with no changes from your original)

Challenges and Solutions

(continues with no changes from your original)

Future Enhancements

(continues with no changes from your original)

License

GigMap is licensed under the MIT License. See the LICENSE file for details. OpenStreetMap data is used under the Open Database License (ODbL), with proper attribution provided in the application.

Contact

For inquiries, feedback, or collaboration opportunities, reach out via:
	•	Email: jjingofaroukk@gmail.com
	•	Phone: +256 (751) 360-385
	•	Website: jjingofarouk.xyz
	•	GitHub: jjingofarouk

Explore GigMap, review the code, and let’s build the future of freelance networking together!

