import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import CreatePin from './pages/CreatePin';
import FreelancerProfile from './pages/FreelancerProfile';
import NotFound from './pages/NotFound';
import Header from './components/Header';
import Footer from './components/Footer';

const App: React.FC = () => {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        {/* Header with navigation */}
        <Header />
        {/* Main content area */}
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/create" element={<CreatePin />} />
            <Route path="/freelancer/:id" element={<FreelancerProfile />} />
            {/* Placeholder routes for Header navigation links */}
            <Route path="/freelancers" element={<NotFound />} />
            <Route path="/about" element={<NotFound />} />
            <Route path="/contact" element={<NotFound />} />
            {/* Catch-all route for undefined paths */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        {/* Footer with links and contact info */}
        <Footer />
      </div>
    </Router>
  );
};

export default App;