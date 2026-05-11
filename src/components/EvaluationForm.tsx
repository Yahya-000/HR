import React, { useState } from 'react';
import { useApp } from '../App';
import { Employee, Criterion, EvaluationDetail } from '../types';
import { Save, Send, Calculator, AlertCircle } from 'lucide-react';

interface Props {
  employee: Employee;
  onClose: () => void;
}

export const EvaluationForm = ({ employee, onClose }: Props) => {
  const { t, criteria, user, refreshData } = useApp();
  const [scores, setScores] = useState<Record<string, number>>({});
  const [comments, setComments] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const relevantCriteria = criteria.filter(c => c.category === employee.category);

  const calculateTotal = () => {
    let total = 0;
    relevantCriteria.forEach(c => {
      const score = scores[c.id] || 0;
      total += (score * c.weight) / 100;
    });
    return Math.round(total);
  };

  const currentScore = calculateTotal();

  const getRecommendation = (score: number) => {
    if (score >= 90) return t.promotion;
    if (score >= 80) return t.salaryRaise10;
    if (score >= 70) return t.salaryRaise5;
    if (score >= 60) return t.development;
    return t.improvementPlan;
  };

  const handleSubmit = async (status: 'draft' | 'submitted') => {
    setIsSubmitting(true);
    const details: EvaluationDetail[] = relevantCriteria.map(c => ({
      criteriaId: c.id,
      score: scores[c.id] || 0
    }));

    const evaluation = {
      employeeId: employee.id,
      managerId: user?.id,
      period: "2024-Q2",
      details,
      totalScore: currentScore,
      recommendation: getRecommendation(currentScore),
      status
    };

    try {
      await fetch('/api/evaluations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(evaluation)
      });
      await refreshData();
      onClose();
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl p-10 max-w-2xl w-full max-h-[90vh] overflow-y-auto no-scrollbar shadow-2xl border border-slate-200">
      <div className="flex justify-between items-center mb-10 pb-6 border-b border-slate-100">
        <div>
          <h2 className="text-2xl font-black text-slate-900 uppercase tracking-tight">{t.addEvaluation}</h2>
          <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mt-1">{employee.name} • {employee.jobTitle}</p>
        </div>
        <button onClick={onClose} className="p-2 hover:bg-slate-50 rounded-lg text-slate-300">
          <Calculator size={20} />
        </button>
      </div>

      <div className="space-y-6">
        {relevantCriteria.map(criterion => (
          <div key={criterion.id} className="bg-slate-50 p-5 rounded-xl border border-slate-200 shadow-sm">
            <div className="flex justify-between mb-4">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">
                {useApp().lang === 'ar' ? criterion.nameAr : criterion.name}
              </label>
              <span className="text-[10px] font-black text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded uppercase tracking-widest">
                {scores[criterion.id] || 0}% / {criterion.weight}%
              </span>
            </div>
            <input 
              type="range"
              min="0"
              max="100"
              value={scores[criterion.id] || 0}
              onChange={e => setScores({ ...scores, [criterion.id]: parseInt(e.target.value) })}
              className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
            />
          </div>
        ))}
      </div>

      <div className="mt-10 p-8 bg-slate-900 rounded-xl shadow-xl shadow-slate-200 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 p-4 opacity-10">
          <Award size={80} />
        </div>
        <div className="flex justify-between items-center mb-4 relative z-10">
          <span className="text-indigo-300 text-[10px] font-black uppercase tracking-widest">Final Performance Score</span>
          <span className="text-4xl font-black text-white">{currentScore}%</span>
        </div>
        <div className="flex items-center gap-3 bg-white/10 p-4 rounded-lg relative z-10 border border-white/10">
          <AlertCircle size={20} className="text-indigo-400 shrink-0" />
          <p className="text-xs font-bold uppercase tracking-wide leading-relaxed">{getRecommendation(currentScore)}</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mt-10">
        <button 
          onClick={() => handleSubmit('draft')}
          disabled={isSubmitting}
          className="py-4 px-4 bg-white border border-slate-200 text-slate-500 rounded-lg text-xs font-black uppercase tracking-widest hover:bg-slate-50 transition-all flex items-center justify-center gap-2"
        >
          <Save size={16} />
          {t.saveDraft}
        </button>
        <button 
          onClick={() => handleSubmit('submitted')}
          disabled={isSubmitting}
          className="py-4 px-8 bg-indigo-600 text-white rounded-lg text-xs font-black uppercase tracking-widest hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100 flex items-center justify-center gap-2"
        >
          <Send size={16} />
          {t.submit}
        </button>
      </div>
    </div>
  );
};
