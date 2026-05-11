import express from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs/promises';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = 3000;
const DB_PATH = path.join(__dirname, 'db.json');

// Initial DB state
const INITIAL_DB = {
  users: [
    { id: '1', email: 'admin@talentscore.com', role: 'admin', name: 'System Admin' },
    { id: '2', email: 'hr@talentscore.com', role: 'hr', name: 'HR Manager' },
    { id: '3', email: 'manager@talentscore.com', role: 'manager', name: 'Office Manager' },
    { id: '4', email: 'employee@talentscore.com', role: 'employee', name: 'John Doe' }
  ],
  employees: [
    {
      id: 'e1',
      userId: '4',
      employeeCode: 'EMP001',
      name: 'John Doe',
      jobTitle: 'Accountant',
      category: 'office',
      department: 'Finance',
      branch: 'Headquarters',
      baseSalary: 5000,
      hireDate: '2023-01-15',
      status: 'active'
    }
  ],
  criteria: [
    { id: 'c1', name: 'Attendance', nameAr: 'الالتزام بالحضور', weight: 20, category: 'office' },
    { id: 'c2', name: 'Task Completion', nameAr: 'إنجاز المهام', weight: 25, category: 'office' },
    { id: 'c3', name: 'Work Quality', nameAr: 'جودة العمل', weight: 25, category: 'office' },
    { id: 'c4', name: 'Teamwork', nameAr: 'التعاون مع الفريق', weight: 10, category: 'office' },
    { id: 'c5', name: 'Problem Solving', nameAr: 'حل المشكلات', weight: 10, category: 'office' },
    { id: 'c6', name: 'Self Development', nameAr: 'التطوير الذاتي', weight: 10, category: 'office' },
    { id: 'c7', name: 'Sales Target', nameAr: 'تحقيق الهدف البيعي', weight: 30, category: 'branch' },
    { id: 'c8', name: 'Customer Satisfaction', nameAr: 'رضا العملاء', weight: 20, category: 'branch' },
    { id: 'c9', name: 'Attendance', nameAr: 'الالتزام بالحضور', weight: 15, category: 'branch' },
    { id: 'c10', name: 'Transaction Count', nameAr: 'عدد العمليات', weight: 15, category: 'branch' },
    { id: 'c11', name: 'Policy Compliance', nameAr: 'الالتزام بالسياسات', weight: 10, category: 'branch' },
    { id: 'c12', name: 'Teamwork', nameAr: 'التعاون والعمل الجماعي', weight: 10, category: 'branch' }
  ],
  evaluations: [],
  achievements: [],
  notifications: []
};

async function getDB() {
  try {
    const data = await fs.readFile(DB_PATH, 'utf-8');
    return JSON.parse(data);
  } catch {
    await fs.writeFile(DB_PATH, JSON.stringify(INITIAL_DB, null, 2));
    return INITIAL_DB;
  }
}

async function saveDB(data: any) {
  await fs.writeFile(DB_PATH, JSON.stringify(data, null, 2));
}

async function startServer() {
  const app = express();
  app.use(express.json());

  // API Routes
  app.get('/api/db', async (req, res) => {
    const db = await getDB();
    res.json(db);
  });

  app.post('/api/evaluations', async (req, res) => {
    const db = await getDB();
    const newEvaluation = {
      id: Math.random().toString(36).substr(2, 9),
      createdAt: new Date().toISOString(),
      ...req.body
    };
    db.evaluations.push(newEvaluation);
    await saveDB(db);
    res.json(newEvaluation);
  });

  app.post('/api/achievements', async (req, res) => {
    const db = await getDB();
    const newAchievement = {
      id: Math.random().toString(36).substr(2, 9),
      ...req.body
    };
    db.achievements.push(newAchievement);
    await saveDB(db);
    res.json(newAchievement);
  });

  // Health check
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok' });
  });

  // Vite middleware
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { 
        middlewareMode: true,
        host: '0.0.0.0',
        port: 3000
      },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, 'dist')));
    app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
