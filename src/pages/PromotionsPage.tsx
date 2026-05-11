import React from 'react';
import { useApp } from '../App';
import { History, TrendingUp, Sparkles, UserPlus } from 'lucide-react';
import { motion } from 'motion/react';

export const PromotionsPage = () => {
  const { t, evaluations, employees } = useApp();

  // Filter employees who scored above 90 (eligible for promotion)
  const eligible = evaluations
    .filter(evalItem => evalItem.totalScore >= 90)
    .map(evalItem => ({
      ...evalItem,
      employee: employees.find(e => e.id === evalItem.employeeId)
    }));

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-slate-900 mb-2">{t.promotions}</h1>
        <p className="text-slate-500">Track and manage employee career growth and financial adjustments.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
           <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50">
               <div className="flex items-center gap-3">
                <TrendingUp className="text-indigo-600" size={24} />
                <h2 className="text-xl font-black text-slate-800 uppercase tracking-tight">Growth Pipeline</h2>
              </div>
            </div>
            <div className="p-6">
              {eligible.length === 0 ? (
                <div className="py-20 text-center space-y-4">
                  <Sparkles className="mx-auto text-slate-200" size={48} />
                  <p className="text-slate-400 font-black uppercase tracking-widest text-xs italic">Currently no employees have met the promotion threshold (90%+).</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {eligible.map((item, i) => (
                    <motion.div 
                      key={item.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="p-5 bg-white rounded-2xl border border-slate-200 flex items-center justify-between group hover:shadow-md transition-all"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-slate-900 text-white shadow-xl shadow-slate-200 rounded-xl flex items-center justify-center font-bold text-lg group-hover:bg-indigo-600 transition-colors">
                          {item.employee?.name.charAt(0)}
                        </div>
                        <div>
                          <p className="font-bold text-slate-900 uppercase tracking-tight">{item.employee?.name}</p>
                          <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest">{item.employee?.jobTitle} • {item.employee?.category}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-6">
                        <div className="text-right">
                          <span className="inline-block px-3 py-1 bg-emerald-50 text-emerald-700 text-[10px] font-black uppercase tracking-tighter rounded border border-emerald-100">
                             {item.totalScore}%
                          </span>
                          <p className="text-[10px] text-slate-400 font-black uppercase tracking-tight mt-1">{item.recommendation}</p>
                        </div>
                        <button className="px-6 py-3 bg-indigo-600 text-white rounded-lg text-[10px] font-black uppercase tracking-widest hover:bg-indigo-700 transition-shadow shadow-lg shadow-indigo-100">
                          Approve
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-slate-900 p-8 rounded-2xl shadow-2xl shadow-slate-200 text-white relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:scale-110 transition-transform">
               <Award size={140} />
            </div>
            <h3 className="text-lg font-black mb-6 flex items-center gap-2 uppercase tracking-tight relative z-10">
              <Sparkles size={20} className="text-indigo-400" />
              Promotion Rules
            </h3>
            <div className="space-y-6 relative z-10">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-lg bg-white/10 flex items-center justify-center text-[10px] font-black shrink-0 border border-white/10">1</div>
                <p className="text-[10px] text-indigo-100/70 font-semibold leading-relaxed tracking-wide">Score of <b className="text-white">90% or higher</b> triggers a mandatory promotion review and a 15% salary increase recommendation.</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-lg bg-white/10 flex items-center justify-center text-[10px] font-black shrink-0 border border-white/10">2</div>
                <p className="text-[10px] text-indigo-100/70 font-semibold leading-relaxed tracking-wide">Score between <b className="text-white">80% - 89%</b> qualifies for a standard 10% salary increase without title change.</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-lg bg-white/10 flex items-center justify-center text-[10px] font-black shrink-0 border border-white/10">3</div>
                <p className="text-[10px] text-indigo-100/70 font-semibold leading-relaxed tracking-wide">Manager feedback and employee achievements must be verified by HR before final approval.</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-6 flex items-center gap-2">
              <History size={16} />
              Recent Logs
            </h3>
            <div className="space-y-4">
              <div className="p-4 bg-slate-50 border border-slate-100 rounded-xl relative overflow-hidden group hover:bg-white hover:shadow-md transition-all">
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-emerald-500" />
                <p className="text-[10px] font-black text-slate-900 uppercase tracking-tight">Salary Updated</p>
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">John Doe • +15% Raise</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
