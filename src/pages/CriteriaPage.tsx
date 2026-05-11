import React from 'react';
import { useApp } from '../App';
import { Settings, ShieldCheck, Scale, Info } from 'lucide-react';

export const CriteriaPage = () => {
  const { t, criteria, lang } = useApp();

  const officeCriteria = criteria.filter(c => c.category === 'office');
  const branchCriteria = criteria.filter(c => c.category === 'branch');

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-slate-900 mb-2">{t.criteria}</h1>
        <p className="text-slate-500">Define and weight performance metrics for different job categories.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Office Criteria */}
        <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
          <div className="p-6 bg-blue-600 text-white flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Scale size={24} />
              <h2 className="text-xl font-bold">{t.office} Employees</h2>
            </div>
            <span className="text-sm bg-white/20 px-3 py-1 rounded-full font-bold">Total: 100%</span>
          </div>
          <div className="p-6 space-y-4">
            {officeCriteria.map(c => (
              <div key={c.id} className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
                <div>
                  <p className="font-bold text-slate-800">{lang === 'ar' ? c.nameAr : c.name}</p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-48 h-2 bg-slate-200 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-500" style={{ width: `${c.weight}%` }} />
                  </div>
                  <span className="font-bold text-slate-700 w-10">{c.weight}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Branch Criteria */}
        <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
          <div className="p-6 bg-indigo-600 text-white flex items-center justify-between">
            <div className="flex items-center gap-3">
              <ShieldCheck size={24} />
              <h2 className="text-xl font-bold">{t.branch} Employees</h2>
            </div>
            <span className="text-sm bg-white/20 px-3 py-1 rounded-full font-bold">Total: 100%</span>
          </div>
          <div className="p-6 space-y-4">
            {branchCriteria.map(c => (
              <div key={c.id} className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
                <div>
                  <p className="font-bold text-slate-800">{lang === 'ar' ? c.nameAr : c.name}</p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-48 h-2 bg-slate-200 rounded-full overflow-hidden">
                    <div className="h-full bg-indigo-500" style={{ width: `${c.weight}%` }} />
                  </div>
                  <span className="font-bold text-slate-700 w-10">{c.weight}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-blue-50 p-6 rounded-3xl border border-blue-100 flex gap-4">
        <Info className="text-blue-500 shrink-0" size={24} />
        <div>
          <p className="font-bold text-blue-900 mb-1">How it works</p>
          <p className="text-blue-700 text-sm">
            Scores for each criterion are multiplied by their weight and summed up to produce the final performance score. 
            Adjusting weights here will automatically affect all future evaluations.
          </p>
        </div>
      </div>
    </div>
  );
};
