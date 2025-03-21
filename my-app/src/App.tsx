import "./App.css";
import TaskCard from "./TaskCard";

interface Task {
  id: number;
  title: string;
  description: string;
  status: 'pending' | 'in progress' | 'done';
  priority: 'high' | 'medium' | 'low';
  assignedTo?: string;
}

function App() {
  const pendingTasks: Task[] = [
    { id: 1, title: "Create wireframes", description: "Design UI wireframes for new features", status: "pending", priority: "low", assignedTo: "Sarah Johnson" },
    { id: 2, title: "Research competitors", description: "Analyze similar products in the market", status: "pending", priority: "medium", assignedTo: "Alex Chen" },
    { id: 7, title: "Write tests", description: "Implement unit tests for new components", status: "pending", priority: "high", assignedTo: "Jordan Taylor" }
  ];
  
  const inProgressTasks: Task[] = [
    { id: 3, title: "Implement login", description: "Develop authentication system", status: "in progress", priority: "high", assignedTo: "Miguel Rodriguez" },
    { id: 4, title: "Set up database", description: "Configure MongoDB for task storage", status: "in progress", priority: "medium", assignedTo: "Priya Patel" },
    { id: 8, title: "Code review", description: "Review pull requests and provide feedback", status: "in progress", priority: "low", assignedTo: "Jordan Taylor" }
  ];
  
  const doneTasks: Task[] = [
    { id: 5, title: "Project setup", description: "Initialize project and install dependencies", status: "done", priority: "low", assignedTo: "Jordan Taylor" },
    { id: 6, title: "Create repo", description: "Set up git repository and initial commit", status: "done", priority: "high", assignedTo: "Sarah Johnson" },
    { id: 9, title: "Deploy app", description: "Deploy application to production server", status: "done", priority: "medium", assignedTo: "Priya Patel" }
  ];

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-center">Task-AI Manager</h1>
      
      <div className="flex gap-4">
        <div className="flex-1 p-4 rounded-lg">
          <h2 className="font-bold text-lg mb-3">Pending</h2>
          {pendingTasks.map(task => (
            <TaskCard 
              key={task.id}
              title={task.title}
              description={task.description}
              status={task.status}
              priority={task.priority}
              assignedTo={task.assignedTo}
            />
          ))}
        </div>
        
        <div className="flex-1 p-4 rounded-lg">
          <h2 className="font-bold text-lg mb-3">In Progress</h2>
          {inProgressTasks.map(task => (
            <TaskCard 
              key={task.id}
              title={task.title}
              description={task.description}
              status={task.status}
              priority={task.priority}
              assignedTo={task.assignedTo}
            />
          ))}
        </div>
        
        <div className="flex-1 p-4 rounded-lg">
          <h2 className="font-bold text-lg mb-3">Done</h2>
          {doneTasks.map(task => (
            <TaskCard 
              key={task.id}
              title={task.title}
              description={task.description}
              status={task.status}
              priority={task.priority}
              assignedTo={task.assignedTo}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;