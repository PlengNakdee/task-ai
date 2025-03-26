import React, { useEffect, useRef } from "react";
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
  status: initialStatus,
  priority,
  assignedTo: initialAssignedTo,
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

  const [showStatusDropdown, setShowStatusDropdown] = useState(false);
  const [status, setStatus] = useState(initialStatus);
  const [showAssignedDropdown, setShowAssignedDropdown] = useState(false);
  const [assignedTo, setAssignedTo] = useState(initialAssignedTo);

  const statusOptions: TaskCardProps["status"][] = [
    "pending",
    "in progress",
    "done",
  ];

  return (
    <div className="p-4 rounded-lg shadow-md mb-3 border bg-neutral-200">
      <h3 className="font-bold text-lg text-gray-700 mb-1">{title}</h3>
      <p className="text-gray-700 mb-2">{description}</p>
      <div className="flex justify-between items-center">
        <span
          className={`relative text-sm font-medium px-2 py-1 rounded-lg text-white ${setStatusColor()} cursor-pointer`}
          onClick={() => setShowStatusDropdown(!showStatusDropdown)}
        >
          {status}

          {showStatusDropdown && (
            <div className="absolute top-full left-0 mt-1 w-48 bg-white rounded-md shadow-lg z-10 border border-gray-200">
              <div className="py-1">
                {statusOptions
                  .filter((option) => option !== status)
                  .map((option, index) => (
                    <div
                      key={index}
                      className="block text-sm font-medium px-2 py-1 text-gray-700 cursor-pointer hover:bg-gray-100"
                      onClick={(e) => {
                        e.stopPropagation();
                        setStatus(option);
                        setShowStatusDropdown(false);
                      }}
                    >
                      {option}
                    </div>
                  ))}
              </div>
            </div>
          )}
        </span>
        <span
          className={`text-sm font-medium px-2 py-1 rounded-lg text-white ${setPriorityColor()}`}
        >
          {priority}
        </span>
        <span
          className="relative text-sm font-medium px-2 py-1 rounded-lg text-white bg-blue-500 cursor-pointer"
          onClick={() => setShowAssignedDropdown(!showAssignedDropdown)}
        >
          {assignedTo || "Not Assigned"}

          {showAssignedDropdown && (
            <div className="absolute top-full right-0 mt-1 w-48 bg-white rounded-md shadow-lg z-10 border border-gray-200">
              <div className="py-1">
                {teamMembers
                  .filter((member) => member !== assignedTo)
                  .map((member, index) => (
                    <div
                      key={index}
                      className="block text-sm font-medium px-2 py-1 text-gray-700 cursor-pointer hover:bg-gray-100"
                      onClick={(e) => {
                        e.stopPropagation();
                        setAssignedTo(member);
                        setShowAssignedDropdown(false);
                      }}
                    >
                      {member}
                    </div>
                  ))}
              </div>
            </div>
          )}
        </span>
      </div>
    </div>
  );
};

export default TaskCard;
