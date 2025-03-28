import { useEffect, useState } from "react";
import "./App.css";
import TaskCard from "./TaskCard";
import {
  doneTasks as initialDoneTasks,
  inProgressTasks as initialInprogressTasks,
  pendingTasks as initialPendingTasks,
  Task,
} from "./tasks";
import { v4 as uuidv4 } from "uuid";

function App() {
  const [pendingTasks, setPendingTasks] = useState<Task[]>(() => {
    const savedPendingTasks = localStorage.getItem("pendingTasks");

    if (!savedPendingTasks || savedPendingTasks === "[]") {
      localStorage.setItem("pendingTasks", JSON.stringify(initialPendingTasks));

      return initialPendingTasks;
    }
    return JSON.parse(savedPendingTasks);
  });

  const [inProgressTasks, setInProgressTasks] = useState<Task[]>(() => {
    const savedInProgressTasks = localStorage.getItem("inProgressTasks");

    if (!savedInProgressTasks || savedInProgressTasks === "[]") {
      localStorage.setItem(
        "inProgressTasks",
        JSON.stringify(initialInprogressTasks)
      );
      return initialInprogressTasks;
    }
    return JSON.parse(savedInProgressTasks);
  });

  const [doneTasks, setDoneTasks] = useState<Task[]>(() => {
    const savedDoneTasks = localStorage.getItem("doneTasks");

    if (!savedDoneTasks || savedDoneTasks === "[]") {
      localStorage.setItem("doneTasks", JSON.stringify(initialDoneTasks));
      return initialDoneTasks;
    }
    return JSON.parse(savedDoneTasks);
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    localStorage.setItem("pendingTasks", JSON.stringify(pendingTasks));
  }, [pendingTasks]);

  // const handleImprove = async () => {
  //   const API_KEY = import.meta.env.VITE_HUGGINGFACE_API_KEY;
  //   try {
  //     const response = await fetch(
  //       "https://api-inference.huggingface.co/models/OpenAssistant/oasst-sft-1-pythia-12b",
  //       {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //           Authorization: `Bearer ${API_KEY}`,
  //         },
  //         body: JSON.stringify({
  //           // inputs: `Rewrite this "${title}" and "${description}" to be clear and actionable.`,
          
  //           inputs: `Improved Task Format:\nTitle: [Concise, Specific Title]\nDescription: [Detailed, Clear Description]\n\nOriginal Task: Title: ${title}, Description: ${description}. Please fix it.\n\nImproved Task:`,
          
  //           parameters: {
  //             max_length: 200,
  //           },
  //         }),
  //       }
  //     );

  //     const data = await response.json();
  //     console.log("Response from Hugging Face API:", data);

  //     if (response.ok) {
  //       const generatedText = data[0]?.generated_text || "";
  //       console.log("Generated text:", generatedText);
  //       // const titleMatch = generatedText.match(
  //       //   /Title:\s*(.+?)(?=Description:)/
  //       // );
  //       // const descriptionMatch = generatedText.match(/Description:\s*(.+)$/);

  //       // setOptimizedTitle(titleMatch ? titleMatch[1].trim() : title);
  //       // setOptimizedDescription(descriptionMatch ? descriptionMatch[1].trim() : description);
  //     } else {
  //       console.error("Error from Hugging Face API:", data);
  //     }
  //   } catch (error) {
  //     console.error("Error optimizing task:", error);
  //   }
  // };
  const handleImprove = async () => {
    try {
      const response = await fetch('/api/improve-task', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title,
          description
        })
      });
  
      if (!response.ok) {
        throw new Error('Failed to improve task');
      }
  
      const data = await response.json();
      console.log('Response from API:', data);
      
      // setOptimizedTitle(data.optimizedTitle);
      // setOptimizedDescription(data.optimizedDescription);
    } catch (error) {
      console.error('Error optimizing task:', error);
      // Fallback to original values
      // setOptimizedTitle(title);
      // setOptimizedDescription(description);
    }
  };

  const saveTask = () => {
    const newTask: Task = {
      id: uuidv4(),
      title,
      description,
      status: "pending",
      priority: "low",
      assignedTo: "",
    };

    setPendingTasks((prevTasks) => [...prevTasks, newTask]);
    setIsModalOpen(false);
    setTitle("");
    setDescription("");
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-center">Task-AI Manager</h1>
      <button
        className="bg-pink-400 text-white px-4 py-2 rounded-lg mb-4"
        onClick={() => setIsModalOpen(true)}
      >
        add task
      </button>
      {isModalOpen && (
        <div className="fixed inset-0 bg-black flex justify-center items-center z-50 w-full h-full bg-opacity-50">
          <div className="p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold mb-4">Add New Task</h2>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Task name"
              className="border p-2 rounded w-full mb-4"
            />
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Task description"
              className="border p-2 rounded w-full mb-4"
            />
            <div className="flex justify-between mb-4">
              <button
                className="bg-red-300 px-4 py-2 rounded-lg"
                onClick={handleImprove}
              >
                Improve with AI
              </button>
              <div className="flex justify-end space-x-2">
                <button
                  className="bg-gray-300 px-4 py-2 rounded-lg"
                  onClick={() => setIsModalOpen(false)}
                >
                  Cancel
                </button>
                <button
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg"
                  onClick={saveTask}
                >
                  Save Task
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      <div className="grid grid-cols-3 gap-4">
        <div className="p-4 rounded-lg">
          <h2 className="font-bold text-lg mb-3">Pending</h2>
          {pendingTasks.map((task) => (
            <TaskCard
              id={task.id}
              title={task.title}
              description={task.description}
              status={task.status}
              priority={task.priority}
              assignedTo={task.assignedTo}
            />
          ))}
        </div>

        <div className="p-4 rounded-lg">
          <h2 className="font-bold text-lg mb-3">In Progress</h2>
          {inProgressTasks.map((task) => (
            <TaskCard
              id={task.id}
              title={task.title}
              description={task.description}
              status={task.status}
              priority={task.priority}
              assignedTo={task.assignedTo}
            />
          ))}
        </div>

        <div className="p-4 rounded-lg">
          <h2 className="font-bold text-lg mb-3">Done</h2>
          {doneTasks.map((task) => (
            <TaskCard
              id={task.id}
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
