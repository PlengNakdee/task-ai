import { v4 as uuidv4 } from "uuid";

export interface Task {
  id: string;
  title: string;
  description: string;
  status: 'pending' | 'in progress' | 'done';
  priority: 'high' | 'medium' | 'low';
  assignedTo?: string;
}

export const pendingTasks: Task[] = [
  { id: uuidv4(), title: "Create wireframes", description: "Design UI wireframes for new features", status: "pending", priority: "low", assignedTo: "Sarah Johnson" },
  { id: uuidv4(), title: "Research competitors", description: "Analyze similar products in the market", status: "pending", priority: "medium", assignedTo: "Alex Chen" },
  { id: uuidv4(), title: "Write tests", description: "Implement unit tests for new components", status: "pending", priority: "high", assignedTo: "Jordan Taylor" }
];

export const inProgressTasks: Task[] = [
  { id: uuidv4(), title: "Implement login", description: "Develop authentication system", status: "in progress", priority: "high", assignedTo: "Miguel Rodriguez" },
  // { id: 4, title: "Set up database", description: "Configure MongoDB for task storage", status: "in progress", priority: "medium", assignedTo: "Priya Patel" },
  // { id: 8, title: "Code review", description: "Review pull requests and provide feedback", status: "in progress", priority: "low", assignedTo: "Jordan Taylor" }
];

export const doneTasks: Task[] = [
  { id: uuidv4(), title: "Project setup", description: "Initialize project and install dependencies", status: "done", priority: "low", assignedTo: "Jordan Taylor" },
  // { id: 6, title: "Create repo", description: "Set up git repository and initial commit", status: "done", priority: "high", assignedTo: "Sarah Johnson" },
  // { id: 9, title: "Deploy app", description: "Deploy application to production server", status: "done", priority: "medium", assignedTo: "Priya Patel" }
];

export const teamMembers = [
  "Sarah Johnson",
  "Alex Chen",
  "Miguel Rodriguez",
  "Priya Patel",
  "Jordan Taylor",
];