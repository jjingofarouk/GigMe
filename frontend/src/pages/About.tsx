// src/pages/About.tsx
import '../styles/About.css';

const About: React.FC = () => {
  return (
    <div className="about-container">
      <div className="about-header">
        <div className="container">
          <h1>About GigMap</h1>
          <p>Connecting clients with talented freelancers worldwide</p>
        </div>
      </div>

      <div className="container">
        <div className="about-content">
          <div className="about-section">
            <h2>Our Mission</h2>
            <p>
              GigMap is dedicated to bridging the gap between clients and freelancers by providing a
              platform where talent meets opportunity. Our mission is to empower freelancers to
              showcase their skills and help clients find the perfect professional for their projects.
            </p>
          </div>

          <div className="about-section">
            <h2>Why Choose GigMap?</h2>
            <ul className="about-features">
              <li>Global network of verified freelancers</li>
              <li>Interactive map to find local talent</li>
              <li>Secure and transparent communication</li>
              <li>Easy-to-use platform for all project sizes</li>
            </ul>
          </div>

          <div className="about-section">
            <h2>Our Story</h2>
            <p>
              Founded in 2025, GigMap was created to simplify the process of finding and hiring
              freelancers. Inspired by the power of open data from OpenStreetMap, we built a platform
              that combines geospatial technology with a user-friendly interface to make freelancing
              accessible to everyone.
            </p>
          </div>

          <div className="about-cta">
            <h2>Join Our Community</h2>
            <p>Whether you're a freelancer or a client, GigMap is here to help you succeed.</p>
            <a href="/create" className="cta-button">Get Started</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;