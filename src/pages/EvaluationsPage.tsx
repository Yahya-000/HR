import React from 'react';
import { useApp } from '../App';
import { FileText, CheckCircle, Clock, AlertCircle } from 'lucide-react';
import { motion } from 'motion/react';

export const EvaluationsPage = () => {
  const { t, evaluations, employees } = useApp();

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-slate-900 mb-2">{t.evaluations}</h1>
        <p className="text-slate-500">History of all performance assessments and recommendations.</p>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-right">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100 uppercase text-[10px] tracking-widest font-black text-slate-500">
                <th className="px-6 py-4">Employee</th>
                <th className="px-6 py-4">Period</th>
                <th className="px-6 py-4 text-center">Score</th>
                <th className="px-6 py-4">Recommendation</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {evaluations.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-20 text-center text-slate-400 font-medium italic">
                    No evaluations found. Start by evaluating an employee.
                  </td>
                </tr>
              ) : (
                evaluations.map((evalItem, i) => {
                  const emp = employees.find(e => e.id === evalItem.employeeId);
                  return (
                    <motion.tr 
                      key={evalItem.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: i * 0.05 }}
                      className="hover:bg-slate-50 transition-colors cursor-pointer group"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 bg-slate-900 text-white rounded-lg flex items-center justify-center font-bold text-xs group-hover:bg-indigo-600 transition-colors">
                            {emp?.name.charAt(0)}
                          </div>
                          <div>
                            <p className="text-sm font-bold text-slate-900 uppercase tracking-tight">{emp?.name}</p>
                            <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest truncate max-w-[120px]">{emp?.jobTitle}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-xs text-slate-600 font-black uppercase tracking-widest">{evalItem.period}</td>
                      <td className="px-6 py-4 text-center">
                        <span className={cn(
                          "px-3 py-1 rounded font-black text-sm uppercase tracking-tighter",
                          evalItem.totalScore >= 80 ? "text-emerald-700 bg-emerald-50" : 
                          evalItem.totalScore >= 70 ? "text-indigo-700 bg-indigo-50" : 
                          "text-rose-700 bg-rose-50"
                        )}>
                          {evalItem.totalScore}%
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-[10px] font-black text-slate-500 uppercase tracking-tight truncate max-w-[180px]">{evalItem.recommendation}</p>
                      </td>
                      <td className="px-6 py-4">
                        {evalItem.status === 'submitted' ? (
                          <span className="flex items-center gap-1.5 text-indigo-600 text-[10px] font-black uppercase tracking-widest py-1 px-2 border border-indigo-100 rounded bg-indigo-50/30 w-fit">
                            <Clock size={10} /> Submitted
                          </span>
                        ) : (
                          <span className="flex items-center gap-1.5 text-emerald-600 text-[10px] font-black uppercase tracking-widest py-1 px-2 border border-emerald-100 rounded bg-emerald-50/30 w-fit">
                            <CheckCircle size={10} /> Approved
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                        {new Date(evalItem.createdAt).toLocaleDateString()}
                      </td>
                    </motion.tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const cn = (...inputs: any[]) => inputs.filter(Boolean).join(' ');
