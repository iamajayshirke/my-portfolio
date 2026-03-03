import React, { useEffect } from 'react';
import { Routes, Route, useParams, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import AdminPortal from './pages/AdminLogin';
import LandingPage from './pages/LandingPage';
import ScrollToTop from './components/ScrollToTop';
import { useAppDispatch, useAppSelector } from './store/hooks';
import { fetchPublicPortfolio } from './store/authSlice';

// A wrapper component to handle data fetching based on the URL
const PortfolioWrapper: React.FC = () => {
  const { username } = useParams<{ username: string }>();
  const dispatch = useAppDispatch();
  const { publicPortfolio, loading, error } = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (username) {
      dispatch(fetchPublicPortfolio(username));
    }
  }, [username, dispatch]);
  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center text-primary font-mono">
        <div className="animate-pulse">Loading Workspace...</div>
      </div>
    );
  }

  // If there's an error (404), redirect to landing
  if (error || !publicPortfolio) {
    return <Navigate to="/" replace />;
  }

  return <Home data={publicPortfolio.content} />;
};


const App: React.FC = () => {

  const handleSave = async (newData: any) => {
    try {
      console.log("Saving to MongoDB:", newData);
      // await axios.put('http://localhost:5000/api/portfolio/update', newData);
      alert("Changes saved successfully!");
    } catch (error) {
      console.error("Save failed", error);
    }
  };
  return (
    <div className="min-h-screen transition-colors duration-300">
      <Navbar />
      <div className="max-w-7xl mx-auto px-6">
        <Routes>
          {/* Main Landing Page for new users to sign up */}
          <Route path="/" element={<LandingPage />} />
          
          {/* Dynamic Portfolio Route */}
          <Route path="/:username" element={<PortfolioWrapper />} />
          
          {/* Admin Portal - In a real SaaS, this would use /dashboard or /settings */}
          <Route path="/admin/manage" element={<AdminPortal onSave={handleSave} />} />
        </Routes>
      </div>
      <ScrollToTop />
    </div>
  );
};

export default App;