import { useState, useEffect, createContext, useContext } from 'react';
import { BrowserRouter, Routes, Route, Navigate, Link, useLocation } from 'react-router-dom';
import { 
  Users, 
  BarChart3, 
  Settings, 
  Award, 
  FileText, 
  Bell, 
  LogOut, 
  ChevronRight, 
  ChevronLeft,
  LayoutDashboard,
  Building2,
  Trophy,
  History,
  Search,
  Languages,
  PlusCircle,
  Menu,
  X
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { translations, Language } from './lib/i18n';
import { User, Role, Employee, Criterion, Evaluation, Achievement } from './types';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

import { Dashboard } from './pages/Dashboard';
import { EmployeesPage } from './pages/EmployeesPage';
import { CriteriaPage } from './pages/CriteriaPage';
import { EvaluationsPage } from './pages/EvaluationsPage';
import { PromotionsPage } from './pages/PromotionsPage';
import { Login } from './components/Login';

// --- Utils ---
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// --- Context ---
interface AppContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  lang: Language;
  setLang: (lang: Language) => void;
  t: any;
  employees: Employee[];
  criteria: Criterion[];
  evaluations: Evaluation[];
  achievements: Achievement[];
  refreshData: () => Promise<void>;
}

const AppContext = createContext<AppContextType | null>(null);

export function useApp() {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
}

// --- Components ---

const SidebarItem = ({ icon: Icon, label, href, active }: any) => {
  const { lang } = useApp();
  const isRtl = lang === 'ar';

  return (
    <Link
      to={href}
      className={cn(
        "flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 group relative",
        active 
          ? "bg-indigo-600/10 text-indigo-400" 
          : "text-slate-400 hover:bg-slate-800 hover:text-white"
      )}
    >
      <Icon size={20} className={cn("shrink-0", active ? "text-indigo-400" : "text-slate-500 group-hover:text-slate-300")} />
      <span className="font-medium text-sm">{label}</span>
      {active && (
        <motion.div 
          layoutId="active-indicator"
          className={cn("absolute w-1 h-5 bg-indigo-400 rounded-full", isRtl ? "left-0" : "right-0")}
        />
      )}
    </Link>
  );
};

const Layout = ({ children }: { children: React.ReactNode }) => {
  const { lang, setLang, t, user, setUser } = useApp();
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  
  const isRtl = lang === 'ar';

  const menuItems = [
    { icon: LayoutDashboard, label: t.dashboard, href: "/" },
    { icon: Users, label: t.employees, href: "/employees" },
    { icon: Building2, label: t.departments, href: "/departments" },
    { icon: Settings, label: t.criteria, href: "/criteria" },
    { icon: FileText, label: t.evaluations, href: "/evaluations" },
    { icon: Trophy, label: t.achievements, href: "/achievements" },
    { icon: History, label: t.promotions, href: "/promotions" },
    { icon: BarChart3, label: t.reports, href: "/reports" },
  ];

  return (
    <div className={cn("min-h-screen bg-slate-50 flex", isRtl ? "font-sans text-right" : "font-sans")} dir={isRtl ? 'rtl' : 'ltr'}>
      {/* Sidebar */}
      <aside className={cn(
        "fixed inset-y-0 z-50 bg-slate-900 text-white border-slate-800 transition-all duration-300 shadow-xl",
        isRtl ? "right-0 border-l" : "left-0 border-r",
        isSidebarOpen ? "w-64" : "w-20"
      )}>
        <div className="flex flex-col h-full p-4">
          <div className="flex items-center gap-3 px-2 mb-8 py-2">
            <div className="w-10 h-10 bg-indigo-500 rounded-lg flex items-center justify-center text-white shrink-0 shadow-lg shadow-indigo-900/50">
              <Award size={24} />
            </div>
            {isSidebarOpen && (
              <span className="font-bold text-xl tracking-tight text-white">{t.appName}</span>
            )}
          </div>

          <nav className="flex-1 space-y-1 overflow-y-auto no-scrollbar">
            {menuItems.map((item) => (
              <SidebarItem 
                key={item.href} 
                {...item} 
                active={location.pathname === item.href} 
              />
            ))}
          </nav>

          <div className="pt-4 mt-4 border-t border-slate-800 space-y-2">
            <button 
              onClick={() => setLang(lang === 'en' ? 'ar' : 'en')}
              className="w-full flex items-center gap-3 px-4 py-2 rounded-lg text-slate-400 hover:bg-slate-800 hover:text-white transition-colors"
            >
              <Languages size={20} />
              {isSidebarOpen && <span className="text-sm font-medium">{lang === 'en' ? 'العربية' : 'English'}</span>}
            </button>
            <div className="p-3 bg-slate-800/50 rounded-xl flex items-center gap-3 mt-4">
              <div className="w-8 h-8 rounded-full bg-slate-600 flex items-center justify-center font-bold text-xs text-white">
                {user?.name.charAt(0)}
              </div>
              {isSidebarOpen && (
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-bold text-white truncate">{user?.name}</p>
                  <p className="text-[10px] text-slate-500 capitalize">{user?.role}</p>
                </div>
              )}
              {isSidebarOpen && (
                <button onClick={() => setUser(null)} className="text-slate-500 hover:text-red-400">
                  <LogOut size={14} />
                </button>
              )}
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className={cn(
        "flex-1 transition-all duration-300",
        isRtl ? (isSidebarOpen ? "mr-64" : "mr-20") : (isSidebarOpen ? "ml-64" : "ml-20")
      )}>
        {/* Header */}
        <header className="h-20 bg-white border-b border-slate-200 px-8 flex items-center justify-between sticky top-0 z-40 backdrop-blur-md bg-white/80">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-2 text-slate-400 hover:bg-slate-100 rounded-lg transition-colors"
            >
              <Menu size={20} />
            </button>
            <h2 className="text-xl font-bold text-slate-800 hidden sm:block">موجز الأداء الذكي</h2>
          </div>

          <div className="flex items-center gap-6">
            <div className="relative hidden lg:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input 
                type="text" 
                placeholder={t.search}
                className="pl-10 pr-4 py-2 bg-slate-100 border-transparent focus:bg-white focus:ring-2 focus:ring-indigo-100 rounded-lg text-sm w-64 transition-all outline-none"
              />
            </div>
            <button className="relative p-2 text-slate-400 hover:bg-slate-100 rounded-full transition-colors">
              <Bell size={20} />
              <span className="absolute top-2 right-2 w-2 h-2 bg-rose-500 border-2 border-white rounded-full"></span>
            </button>
            <div className="flex gap-2">
               <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-semibold hover:bg-indigo-700 transition-shadow shadow-lg shadow-indigo-100">
                 {t.addEvaluation}
               </button>
            </div>
          </div>
        </header>

        <div className="p-8 max-w-7xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
};

// --- Context ---

export default function App() {
  const [user, setUser] = useState<User | null>(null);
  const [lang, setLang] = useState<Language>('ar');
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [criteria, setCriteria] = useState<Criterion[]>([]);
  const [evaluations, setEvaluations] = useState<Evaluation[]>([]);
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const refreshData = async () => {
    try {
      const res = await fetch('/api/db');
      const data = await res.json();
      setEmployees(data.employees);
      setCriteria(data.criteria);
      setEvaluations(data.evaluations);
      setAchievements(data.achievements);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    refreshData();
  }, []);

  const value = {
    user,
    setUser,
    lang,
    setLang,
    t: translations[lang],
    employees,
    criteria,
    evaluations,
    achievements,
    refreshData
  };

  if (isLoading) {
    return (
      <div className="h-screen w-screen flex items-center justify-center bg-slate-50">
        <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <AppContext.Provider value={value}>
        <Login />
      </AppContext.Provider>
    );
  }

  return (
    <AppContext.Provider value={value}>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/employees" element={<EmployeesPage />} />
            <Route path="/criteria" element={<CriteriaPage />} />
            <Route path="/evaluations" element={<EvaluationsPage />} />
            <Route path="/promotions" element={<PromotionsPage />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </AppContext.Provider>
  );
}
