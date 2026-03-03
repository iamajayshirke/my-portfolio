import React, { useState, useEffect } from 'react';
import { Routes, Route, useParams, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import AdminPortal from './pages/AdminLogin';
import LandingPage from './pages/LandingPage';
import ScrollToTop from './components/ScrollToTop';
import type { IPortfolioContent, IUser } from './types';
import axios from 'axios';

// A wrapper component to handle data fetching based on the URL
const PortfolioWrapper: React.FC = () => {
  const { username } = useParams<{ username: string }>();
  const [userData, setUserData] = useState<IUser | null>(null);
  const [loading, setLoading] = useState(true);
const defaultContent: IPortfolioContent = {
  name: "Loading...",
  role: "",
  experience: "",
  techStack: [],
  jobs: [],
  projects: [],
  education: []
};
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/portfolio/${username}`);
        console.log(res,"Response")
        setUserData(res.data);
        // Apply theme dynamically from DB config
        document.documentElement.setAttribute('data-theme', res.data.config.theme);
      } catch (err) {
        console.error("User not found");
      } finally {
        setLoading(false);
      }
    };
    if (username) fetchUser();
  }, [username]);

  if (loading) return <div className="h-screen flex items-center justify-center text-primary">Loading...</div>;
  if (!userData) return <Navigate to="/" />; // Redirect to landing if user doesn't exist

  return <Home data={userData?.content || defaultContent} />;
};


const App: React.FC = () => {
  // 1. We need a 'user' state at the top level for the logged-in admin
  const [adminData, setAdminData] = useState<IUser | null>(null);

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
          <Route path="/admin/manage" element={<AdminPortal data={adminData?.content || {} as any} onSave={handleSave}/>} />
        </Routes>
      </div>
      <ScrollToTop />
    </div>
  );
};

export default App;