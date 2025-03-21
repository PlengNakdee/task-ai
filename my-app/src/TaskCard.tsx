// TaskCard.tsx
import React from "react";
import { useState } from "react";

interface TaskCardProps {
  title: string;
  description: string;
  status: "pending" | "in progress" | "done";
  priority: "high" | "medium" | "low";
  assignedTo?: string;
}

const teamMembers = [
  "Sarah Johnson",
  "Alex Chen",
  "Miguel Rodriguez",
  "Priya Patel",
  "Jordan Taylor",
];

const TaskCard: React.FC<TaskCardProps> = ({
  title,
  description,
  status,
  priority,
  assignedTo,
}) => {
  const setStatusColor = () => {
    switch (status) {
      case "pending":
        return "bg-yellow-500";
      case "in progress":
        return "bg-purple-500";
      case "done":
        return "bg-green-500";
      default:
        return "bg-gray-500";
    }
  };

  const setPriorityColor = () => {
    switch (priority) {
      case "high":
        return "bg-red-500";
      case "medium":
        return "bg-indigo-500";
      case "low":
        return "bg-cyan-500";
      default:
        return "bg-stone-500";
    }
  };

  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <div className="p-4 rounded-lg shadow-md mb-3 border bg-neutral-200">
      <h3 className="font-bold text-lg text-gray-700 mb-1">{title}</h3>
      <p className="text-gray-700 mb-2">{description}</p>
      <div className="flex justify-between items-center">
        <span
          className={`text-sm font-medium px-2 py-1 rounded-lg text-white ${setStatusColor()}`}
        >
          {status}
        </span>
        <span
          className={`text-sm font-medium px-2 py-1 rounded-lg text-white ${setPriorityColor()}`}
        >
          {priority}
        </span>
        <span
          className="text-sm font-medium px-2 py-1 rounded-lg text-white bg-blue-500 cursor-pointer"
          onClick={() => setShowDropdown(!showDropdown)}
        >
          {assignedTo || "Not Assigned"}
        </span>

        <div className="relative mt-2">
          {showDropdown && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10 border border-gray-200">
              <div className="py-1">
                {teamMembers.map((member, index) => (
                  <button
                    key={index}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={() => {
                      console.log(`Assigned to ${member}`);
                      setShowDropdown(false);
                    }}
                  >
                    {member}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
