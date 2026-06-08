import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Home from './pages/Home';
import ScrollToTop from './components/ScrollToTop';

import About from './pages/About';
import Services from './pages/Services';
import Contact from './pages/Contact';

// Placeholder pages
import Projects from './pages/Projects';
import ProjectDetail from './pages/ProjectDetail';
import Technology from './pages/Technology';
import Sustainability from './pages/Sustainability';
import Careers from './pages/Careers';
import Team from './pages/Team';



import AdminLogin from './pages/admin/AdminLogin';
import AdminDashboard from './pages/admin/AdminDashboard';
import ProtectedRoute from './components/auth/ProtectedRoute';

function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="app-container">
        <Routes>
          {/* Admin Routes - No Navbar/Footer layout usually, but for simplicity keeping it or separating */}
          <Route path="/admin" element={<AdminLogin />} />
          <Route
            path="/admin/dashboard"
            element={
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />

          {/* Public Routes with Main Layout */}
          <Route path="/*" element={
            <>
              <Navbar />
              <main>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/services" element={<Services />} />
                  <Route path="/projects/:slug" element={<ProjectDetail />} />
                  <Route path="/projects" element={<Projects />} />
                  <Route path="/technology" element={<Technology />} />
                  <Route path="/sustainability" element={<Sustainability />} />
                  <Route path="/careers" element={<Careers />} />
                  <Route path="/team" element={<Team />} />
                  <Route path="/contact" element={<Contact />} />
                </Routes>
              </main>
              <Footer />
            </>
          } />
        </Routes>
      </div>
    </Router>
  );
}


export default App;
