import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import AdminLogin from './pages/AdminLogin';
import { initialData } from './data';
import type { PortfolioData } from './types';
import ScrollToTop from './components/ScrollToTop';

const App: React.FC = () => {
  const [data, setData] = useState<PortfolioData>(initialData);

  useEffect(() => {
    const savedData = localStorage.getItem('portfolio_data');
    if (savedData) {
      setData(JSON.parse(savedData));
    }
  }, []);

  const updateData = (newData: PortfolioData) => {
    setData(newData); // Updates the UI immediately
    localStorage.setItem('portfolio_data', JSON.stringify(newData)); // Saves for refresh
  };

  return (
   <div className="min-h-screen transition-colors duration-300">
    <Navbar />
    <div className="max-w-5xl mx-auto px-6">
      <Routes>
        <Route path="/" element={<Home data={data} />} /> 
        <Route 
          path="/admin-portal-xyz" 
          element={<AdminLogin data={data} onSave={updateData} />} 
        />
      </Routes>
    </div>
    <ScrollToTop />
  </div>
  );
};

export default App;
