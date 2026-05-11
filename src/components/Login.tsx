import React, { useState } from 'react';
import { useApp } from '../App';
import { Award } from 'lucide-react';

export const Login = () => {
  const { setUser, setLang, lang } = useApp();
  const [email, setEmail] = useState('admin@talentscore.com');
  const isRtl = lang === 'ar';

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate login for demo
    if (email.includes('admin')) setUser({ id: '1', email, role: 'admin', name: 'System Admin' });
    else if (email.includes('hr')) setUser({ id: '2', email, role: 'hr', name: 'HR Manager' });
    else if (email.includes('manager')) setUser({ id: '3', email, role: 'manager', name: 'Office Manager' });
    else setUser({ id: '4', email, role: 'employee', name: 'John Doe' });
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6" dir={isRtl ? 'rtl' : 'ltr'}>
      <div className="w-full max-w-md">
        <div className="text-center mb-10">
          <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center text-white mx-auto mb-6 shadow-xl shadow-blue-100">
            <Award size={36} />
          </div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">TalentScore HR</h1>
          <p className="text-slate-500 mt-2">Intelligent Performance Analytics</p>
        </div>

        <div className="bg-white p-10 rounded-2xl shadow-xl shadow-slate-200 border border-slate-200">
          <form className="space-y-6" onSubmit={handleLogin}>
            <div>
              <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Email Address</label>
              <input 
                type="email" 
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-slate-50 border border-slate-200 focus:bg-white focus:ring-4 focus:ring-indigo-100 focus:border-indigo-500 transition-all outline-none text-sm font-medium"
                placeholder="name@company.com"
              />
            </div>
            <div>
              <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Password</label>
              <input 
                type="password" 
                defaultValue="password"
                className="w-full px-4 py-3 rounded-lg bg-slate-50 border border-slate-200 focus:bg-white focus:ring-4 focus:ring-indigo-100 focus:border-indigo-500 transition-all outline-none text-sm font-medium"
                placeholder="••••••••"
              />
            </div>
            <button 
              type="submit"
              className="w-full py-4 bg-indigo-600 text-white rounded-lg font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100 active:scale-[0.98] uppercase tracking-widest text-xs"
            >
              Sign In
            </button>
          </form>

          <div className="mt-10 pt-8 border-t border-slate-100 flex justify-between items-center">
            <button onClick={() => setLang(lang === 'en' ? 'ar' : 'en')} className="text-indigo-600 text-xs font-bold hover:underline uppercase">
              {lang === 'en' ? 'العربية' : 'English'}
            </button>
            <a href="#" className="text-slate-400 text-xs hover:text-slate-600 font-medium">Forgot Password?</a>
          </div>
        </div>
        
        <p className="text-center mt-8 text-slate-400 text-xs">
          Demo Accounts: admin@, hr@, manager@, employee@
        </p>
      </div>
    </div>
  );
};
