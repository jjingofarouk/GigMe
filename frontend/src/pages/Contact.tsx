// src/pages/Contact.tsx
import { useState, FormEvent } from 'react';
import './Contact.css';

const Contact: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // Placeholder for form submission logic
    setSubmitted(true);
    setName('');
    setEmail('');
    setMessage('');
  };

  return (
    <div className="contact-container">
      <div className="contact-header">
        <div className="container">
          <h1>Contact Us</h1>
          <p>We'd love to hear from you. Get in touch with our team!</p>
        </div>
      </div>

      <div className="container">
        <div className="contact-content">
          {submitted ? (
            <div className="contact-success">
              <h2>Thank You!</h2>
              <p>Your message has been sent. We'll get back to you soon.</p>
              <button
                className="contact-another-message"
                onClick={() => setSubmitted(false)}
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  required
                  aria-label="Your name"
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                  aria-label="Your email"
                />
              </div>
              <div className="form-group">
                <label htmlFor="message">Message</label>
                <textarea
                  id="message"
                  value={message}
                  onChange={e => setMessage(e.target.value)}
                  required
                  aria-label="Your message"
                />
              </div>
              <button type="submit" className="contact-submit">
                Send Message
              </button>
            </form>
          )}

          <div className="contact-info">
            <h2>Contact Information</h2>
            <p>Email: support@gigmap.com</p>
            <p>Phone: +1 (555) 123-4567</p>
            <p>Address: 123 Freelance Ave, Tech City, TC 12345</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;