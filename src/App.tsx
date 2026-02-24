import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import AdminLogin from './pages/AdminLogin';
import { initialData } from './data';
import type { PortfolioData } from './types';

const App: React.FC = () => {
  const [data, setData] = useState<PortfolioData>(initialData);

  useEffect(() => {
    const savedData = localStorage.getItem('portfolio_data');
    if (savedData) {
      setData(JSON.parse(savedData));
    }
  }, []);

  const updateData = (newData: PortfolioData) => {
    setData(newData);
    localStorage.setItem('portfolio_data', JSON.stringify(newData));
  };

  return (
    <div className="bg-slate-950 min-h-screen text-slate-100 selection:bg-blue-500/30">
      <Navbar />
      
      {/* FIX: This wrapper ensures the Home page and Admin page 
          start at the exact same 'x' coordinate as the Navbar content.
      */}
      <div className="max-w-5xl mx-auto px-6">
        <Routes>
          <Route path="/" element={<Home data={data} />} />
          <Route path="/admin-portal-xyz" element={<AdminLogin data={data} onSave={updateData} />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
