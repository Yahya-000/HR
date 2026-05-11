import React, { useState } from 'react';
import { useApp } from '../App';
import { Search, Filter, Plus, MoreVertical, FileText, Award, MapPin, Briefcase } from 'lucide-react';
import { motion } from 'motion/react';
import { EvaluationForm } from '../components/EvaluationForm';
import { Employee } from '../types';

export const EmployeesPage = () => {
  const { t, employees, lang } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'office' | 'branch'>('all');
  const [activeEmployee, setActiveEmployee] = useState<Employee | null>(null);

  const filteredEmployees = employees.filter(emp => {
    const matchesSearch = emp.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         emp.employeeCode.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || emp.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 mb-2">{t.employees}</h1>
          <p className="text-slate-500">Manage your workforce profile and track their performance.</p>
        </div>
        <button className="px-6 py-3 bg-indigo-600 text-white rounded-lg font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100 flex items-center gap-2 text-sm uppercase tracking-wider">
          <Plus size={20} />
          Add New Employee
        </button>
      </div>

      <div className="flex flex-col md:flex-row gap-4 bg-white p-4 rounded-2xl shadow-sm border border-slate-200">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
          <input 
            type="text" 
            placeholder={t.search}
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-slate-50 border-transparent focus:bg-white focus:ring-2 focus:ring-indigo-100 rounded-lg text-sm transition-all outline-none"
          />
        </div>
        <div className="flex gap-2">
          <button 
            onClick={() => setSelectedCategory('all')}
            className={cn(
              "px-4 py-2 rounded-lg text-[10px] font-black transition-all uppercase tracking-widest",
              selectedCategory === 'all' ? "bg-indigo-600 text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"
            )}
          >
            All
          </button>
          <button 
            onClick={() => setSelectedCategory('office')}
            className={cn(
              "px-4 py-2 rounded-lg text-[10px] font-black transition-all uppercase tracking-widest",
              selectedCategory === 'office' ? "bg-indigo-600 text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"
            )}
          >
            {t.office}
          </button>
          <button 
            onClick={() => setSelectedCategory('branch')}
            className={cn(
              "px-4 py-2 rounded-lg text-[10px] font-black transition-all uppercase tracking-widest",
              selectedCategory === 'branch' ? "bg-indigo-600 text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"
            )}
          >
            {t.branch}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredEmployees.map((emp, i) => (
          <motion.div 
            key={emp.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.05 }}
            className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-xl hover:shadow-indigo-100/30 transition-all group"
          >
            <div className="flex justify-between items-start mb-6">
              <div className="w-14 h-14 bg-slate-900 rounded-xl flex items-center justify-center text-white text-xl font-bold shadow-lg shadow-slate-200 group-hover:bg-indigo-600 transition-colors">
                {emp.name.charAt(0)}
              </div>
              <button className="p-2 text-slate-300 hover:bg-slate-50 hover:text-slate-600 rounded-lg transition-colors">
                <MoreVertical size={20} />
              </button>
            </div>

            <div className="mb-6">
              <h3 className="text-lg font-bold text-slate-900 group-hover:text-indigo-600 transition-colors uppercase tracking-tight">{emp.name}</h3>
              <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest mt-1">{emp.jobTitle}</p>
            </div>

            <div className="space-y-3 mb-6 bg-slate-50 p-4 rounded-xl border border-slate-100">
              <div className="flex items-center gap-2 text-slate-600 text-xs font-semibold">
                <Briefcase size={14} className="text-slate-400" />
                <span>{emp.department}</span>
              </div>
              <div className="flex items-center gap-2 text-slate-600 text-xs font-semibold">
                <MapPin size={14} className="text-slate-400" />
                <span>{emp.branch}</span>
              </div>
              <div className="flex items-center gap-2 text-slate-600 text-xs font-semibold">
                <Award size={14} className="text-slate-400" />
                <span className="capitalize">{emp.category} Staff</span>
              </div>
            </div>

            <div className="pt-4 flex gap-2">
              <button 
                onClick={() => setActiveEmployee(emp)}
                className="flex-1 py-3 bg-indigo-50 text-indigo-700 rounded-lg text-[10px] font-black uppercase tracking-widest hover:bg-indigo-100 transition-colors flex items-center justify-center gap-2"
              >
                <FileText size={14} />
                {t.addEvaluation}
              </button>
              <button 
                className="flex-1 py-3 bg-slate-900 text-white rounded-lg text-[10px] font-black uppercase tracking-widest hover:bg-slate-800 transition-colors"
              >
                Profile
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {activeEmployee && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-slate-900/40 backdrop-blur-sm">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-2xl"
          >
            <EvaluationForm employee={activeEmployee} onClose={() => setActiveEmployee(null)} />
          </motion.div>
        </div>
      )}
    </div>
  );
};

// Utils 
const cn = (...inputs: any[]) => inputs.filter(Boolean).join(' ');
