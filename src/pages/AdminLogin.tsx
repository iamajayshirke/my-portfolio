import React, { useState } from 'react';
import type { PortfolioData } from '../types';

interface AdminProps {
  data: PortfolioData;
  onSave: (newData: PortfolioData) => void;
}

const AdminLogin: React.FC<AdminProps> = ({ data, onSave }) => {
  const [isAuth, setIsAuth] = useState(false);
  const [pass, setPass] = useState('');
  const [formData, setFormData] = useState<PortfolioData>(data);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (pass === 'admin123') setIsAuth(true); // Change this passcode
  };

  if (isAuth) {
    return (
      <div className="pt-32 max-w-4xl mx-auto px-6 pb-20">
        <h2 className="text-3xl font-bold mb-8">Edit Portfolio Data</h2>
        <div className="space-y-6 bg-slate-900 p-8 rounded-2xl border border-slate-800">
          <div>
            <label className="block text-sm text-slate-500 mb-2">Years of Experience</label>
            <input 
              className="w-full bg-slate-950 p-3 rounded border border-slate-700"
              value={formData.experience}
              onChange={(e) => setFormData({...formData, experience: e.target.value})}
            />
          </div>
          <button 
            onClick={() => onSave(formData)}
            className="w-full bg-blue-600 hover:bg-blue-500 p-3 rounded-lg font-bold transition"
          >
            Save All Changes
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen flex items-center justify-center">
      <form onSubmit={handleLogin} className="w-80 space-y-4">
        <input 
          type="password" 
          placeholder="Enter Passcode"
          className="w-full p-3 bg-slate-900 border border-slate-800 rounded-xl"
          onChange={(e) => setPass(e.target.value)}
        />
        <button className="w-full bg-slate-100 text-slate-950 p-3 rounded-xl font-bold">Unlock</button>
      </form>
    </div>
  );
};

export default AdminLogin;