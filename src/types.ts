
export type Role = 'admin' | 'hr' | 'manager' | 'employee';
export type JobCategory = 'office' | 'branch';

export interface User {
  id: string;
  email: string;
  role: Role;
  name: string;
}

export interface Employee {
  id: string;
  userId: string;
  employeeCode: string;
  name: string;
  jobTitle: string;
  category: JobCategory;
  department: string;
  branch: string;
  baseSalary: number;
  hireDate: string;
  status: 'active' | 'on_leave' | 'terminated';
}

export interface Criterion {
  id: string;
  name: string;
  nameAr: string;
  weight: number;
  category: JobCategory;
}

export interface EvaluationDetail {
  criteriaId: string;
  score: number; // 0-100
}

export interface Evaluation {
  id: string;
  employeeId: string;
  managerId: string;
  period: string; // e.g., "2024-Q1"
  details: EvaluationDetail[];
  totalScore: number;
  recommendation: string;
  status: 'draft' | 'submitted' | 'hr_approved';
  createdAt: string;
  updatedAt?: string;
}

export interface Achievement {
  id: string;
  employeeId: string;
  title: string;
  description: string;
  date: string;
  status: 'pending' | 'approved' | 'rejected';
}
