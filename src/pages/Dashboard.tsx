import React from 'react';
import { useApp } from '../App';
import { Users, Trophy, Award, BarChart3, PlusCircle } from 'lucide-react';
import { motion } from 'motion/react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// --- Utils ---
const cn = (...inputs: any[]) => inputs.filter(Boolean).join(' ');

export const Dashboard = () => {
  const { t, employees, evaluations } = useApp();
  
  const stats = [
    { label: t.totalEmployees, value: employees.length, color: "bg-indigo-500", icon: Users, trend: "+12%" },
    { label: t.topPerformers, value: evaluations.filter(e => e.totalScore >= 90).length, color: "bg-emerald-500", icon: Trophy, trend: "Target met" },
    { label: t.eligibleForPromotion, value: evaluations.filter(e => e.totalScore >= 80).length, color: "bg-indigo-600", icon: Award, sub: "Based on criteria" },
    { label: t.needsDevelopment, value: evaluations.filter(e => e.totalScore < 70).length, color: "bg-rose-500", icon: BarChart3, sub: "Needs intervention" },
  ];

  const chartData = [
    { name: 'Jan', performance: 65 },
    { name: 'Feb', performance: 59 },
    { name: 'Mar', performance: 80 },
    { name: 'Apr', performance: 81 },
    { name: 'May', performance: 56 },
    { name: 'Jun', performance: 85 },
  ];

  return (
    <div className="space-y-8">
      {/* Top Stats - 4 Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <motion.div 
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between min-h-[140px] hover:shadow-md transition-shadow group"
          >
            <span className="text-slate-500 text-[10px] font-black uppercase tracking-widest">{stat.label}</span>
            <div className="flex items-baseline justify-between mt-4">
              <span className="text-3xl font-black text-slate-900 tracking-tighter">{stat.value}</span>
              {stat.trend ? (
                <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-tight">{stat.trend}</span>
              ) : (
                <span className="text-[10px] font-medium text-slate-400 italic">بناءً على المعايير</span>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Main Grid: 12 Columns */}
      <div className="grid grid-cols-12 gap-8">
        {/* Table Area (8/12) */}
        <div className="col-span-12 lg:col-span-8">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col h-full">
            <div className="p-5 border-b border-slate-100 flex justify-between items-center">
              <h3 className="font-bold text-slate-800 uppercase tracking-tight">قائمة أعلى الموظفين تقييماً</h3>
              <div className="flex gap-2">
                <span className="px-3 py-1 bg-slate-100 text-[10px] font-black text-slate-500 rounded-full cursor-pointer uppercase tracking-widest">موظفو المكاتب</span>
                <span className="px-3 py-1 bg-indigo-600 text-white text-[10px] font-black rounded-full cursor-pointer uppercase tracking-widest">موظفو الفروع</span>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-right">
                <thead className="bg-slate-50 text-slate-500 uppercase text-[10px] tracking-widest font-black">
                  <tr>
                    <th className="p-4 font-black">الموظف</th>
                    <th className="p-4 font-black">الفرع/القسم</th>
                    <th className="p-4 font-black text-center">الدرجة</th>
                    <th className="p-4 font-black text-center">التوصية الآلية</th>
                    <th className="p-4 font-black">الحالة</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {employees.slice(0, 5).map((emp) => (
                    <tr key={emp.id} className="hover:bg-slate-50 transition-colors">
                      <td className="p-4">
                        <div className="font-bold text-slate-900">{emp.name}</div>
                        <div className="text-[10px] text-slate-400 italic">{emp.jobTitle}</div>
                      </td>
                      <td className="p-4 text-slate-600 text-xs font-medium">{emp.department}</td>
                      <td className="p-4 font-black text-indigo-600 text-center text-lg">94%</td>
                      <td className="p-4 text-center">
                        <span className="text-[10px] font-black text-emerald-600 bg-emerald-50 px-2 py-1 rounded uppercase tracking-tighter">ترقية + زيادة 15%</span>
                      </td>
                      <td className="p-4">
                        <span className="flex items-center gap-1.5 text-[10px] font-bold text-slate-600 uppercase">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> {t.statusCompleted}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="p-4 bg-slate-50 border-t border-slate-100 text-center mt-auto">
               <button className="text-indigo-600 text-xs font-black uppercase tracking-widest hover:underline">عرض جميع التقارير</button>
            </div>
          </div>
        </div>

        {/* Side Panels (4/12) */}
        <div className="col-span-12 lg:col-span-4 space-y-6">
          {/* Dark Panel */}
          <div className="bg-indigo-900 text-white rounded-2xl p-6 shadow-xl shadow-indigo-100 group">
             <h4 className="text-lg font-black mb-6 uppercase tracking-tight">نموذج التقييم الذكي</h4>
             <div className="space-y-6">
                <div>
                   <div className="flex justify-between text-[10px] font-black mb-2 text-indigo-200 uppercase tracking-widest">
                      <span>تحقيق الهدف البيعي (فروع)</span>
                      <span>30%</span>
                   </div>
                   <div className="h-1.5 w-full bg-white/10 rounded-full">
                      <div className="h-full w-[30%] bg-white rounded-full transition-all duration-1000"></div>
                   </div>
                </div>
                <div>
                   <div className="flex justify-between text-[10px] font-black mb-2 text-indigo-200 uppercase tracking-widest">
                      <span>إنجاز المهام (مكاتب)</span>
                      <span>25%</span>
                   </div>
                   <div className="h-1.5 w-full bg-white/10 rounded-full">
                      <div className="h-full w-[25%] bg-white rounded-full transition-all duration-1000"></div>
                   </div>
                </div>
                <div className="p-4 bg-white/5 border border-white/10 rounded-xl mt-6">
                   <p className="text-[10px] text-indigo-100/70 leading-relaxed font-medium">
                      يتم احتساب النتيجة تلقائياً بناءً على مصفوفة الأداء والأوزان النسبية لكل نوع وظيفة لضمان العدالة الموضوعية.
                   </p>
                </div>
             </div>
          </div>

          {/* Bar/Area Chart Mini */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
            <h4 className="font-black text-[10px] text-slate-400 uppercase tracking-widest mb-6">توزيع الأداء حسب الفئة</h4>
            <div className="h-32 w-full mt-2">
               <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <Area type="step" dataKey="performance" stroke="#4f46e5" strokeWidth={2} fill="#4f46e5" fillOpacity={0.05} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            <div className="flex justify-between mt-6 px-2">
               {['ممتاز', 'جيد جداً', 'متوسط', 'مقبول'].map((cat) => (
                 <span key={cat} className="text-[9px] font-black text-slate-400 uppercase tracking-tight">{cat}</span>
               ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
