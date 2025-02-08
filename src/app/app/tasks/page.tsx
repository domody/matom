"use client";
import { useState } from "react";
import { TaskItem, TaskItemProps } from "@/app/components/information/TaskItem";

const tasks = [
  {
    team: "Development",
    id: 101,
    status: "InProgress",
    title: "Refactor authentication module",
    tags: ["Backend", "Security"],
    startDate: "2025-02-01",
    endDate: "2025-02-10",
    assignedUsers: ["Alice", "Bob"],
    priority: "High",
    estimatedEffort: "3 days",
    progress: 50,
    type: "Feature",
    lastUpdated: "2025-02-06 14:30",
  },
  {
    team: "Design",
    id: 102,
    status: "Pending",
    title: "Create high-fidelity UI mockups",
    tags: ["UI/UX", "Figma"],
    startDate: "2025-02-05",
    endDate: "2025-02-12",
    assignedUsers: ["Eve"],
    priority: "Medium",
    estimatedEffort: "2 days",
    progress: 0,
    type: "Enhancement",
    lastUpdated: "2025-02-05 10:00",
  },
  {
    team: "Marketing",
    id: 103,
    status: "Completed",
    title: "Launch social media campaign",
    tags: ["Social Media", "SEO"],
    startDate: "2025-01-20",
    endDate: "2025-02-01",
    assignedUsers: ["Charlie", "David"],
    priority: "Low",
    estimatedEffort: "1 week",
    progress: 100,
    type: "Task",
    lastUpdated: "2025-02-02 08:30",
  },
  {
    team: "QA",
    id: 104,
    status: "Blocked",
    title: "Automate regression tests",
    tags: ["Testing", "Cypress"],
    startDate: "2025-02-03",
    endDate: "2025-02-15",
    assignedUsers: ["Grace"],
    priority: "Critical",
    estimatedEffort: "1 week",
    progress: 10,
    type: "Bug",
    lastUpdated: "2025-02-05 09:00",
  },
  {
    team: "Product Management",
    id: 105,
    status: "InReview",
    title: "Finalize Q2 roadmap",
    tags: ["Planning", "Strategy"],
    startDate: "2025-02-07",
    endDate: "2025-02-14",
    assignedUsers: ["Hank", "Ivy"],
    priority: "High",
    estimatedEffort: "4 days",
    progress: 80,
    type: "Task",
    lastUpdated: "2025-02-06 12:15",
  },
  {
    team: "Engineering",
    id: 106,
    status: "InProgress",
    title: "Migrate database to PostgreSQL",
    tags: ["Database", "Migration"],
    startDate: "2025-02-02",
    endDate: "2025-02-09",
    assignedUsers: ["Jake", "Sophia"],
    priority: "High",
    estimatedEffort: "5 days",
    progress: 40,
    type: "Chore",
    lastUpdated: "2025-02-06 15:20",
  },
  {
    team: "Support",
    id: 107,
    status: "Pending",
    title: "Update customer knowledge base",
    tags: ["Docs", "Customer Support"],
    startDate: "2025-02-06",
    endDate: "2025-02-13",
    assignedUsers: ["Laura"],
    priority: "Medium",
    estimatedEffort: "3 days",
    progress: 0,
    type: "Task",
    lastUpdated: "2025-02-06 11:45",
  },
  {
    team: "Security",
    id: 108,
    status: "Blocked",
    title: "Conduct penetration testing",
    tags: ["Security", "Testing"],
    startDate: "2025-02-04",
    endDate: "2025-02-14",
    assignedUsers: ["Michael"],
    priority: "Critical",
    estimatedEffort: "6 days",
    progress: 20,
    type: "Bug",
    lastUpdated: "2025-02-06 13:05",
  },
  {
    team: "HR",
    id: 109,
    status: "InProgress",
    title: "Schedule quarterly reviews",
    tags: ["HR", "Meetings"],
    startDate: "2025-02-08",
    endDate: "2025-02-15",
    assignedUsers: ["Nancy"],
    priority: "Low",
    estimatedEffort: "2 days",
    progress: 30,
    type: "Chore",
    lastUpdated: "2025-02-06 16:00",
  },
  {
    team: "Operations",
    id: 110,
    status: "Completed",
    title: "Optimize cloud infrastructure",
    tags: ["DevOps", "AWS"],
    startDate: "2025-01-25",
    endDate: "2025-02-05",
    assignedUsers: ["Olivia", "Ethan"],
    priority: "High",
    estimatedEffort: "1 week",
    progress: 100,
    type: "Enhancement",
    lastUpdated: "2025-02-05 17:30",
  },
];

export default function Tasks() {
  const [taskSelected, setTaskSelected] = useState<TaskItemProps | null>(null);

  return (
    <div className="flex h-full w-[calc(100%-16rem)] flex-col overflow-x-hidden">
      <div className="border-border-muted flex h-14 w-full items-center border-b px-4">
        <h3 className="font-medium">Tasks</h3>
      </div>
      <div className="flex h-full w-full">
        <div
          className={`flex shrink-0 flex-col transition-all ${taskSelected ? "w-1/2" : "w-full"}`}
        >
          {tasks.map((task, index) => (
            <TaskItem
              task={task}
              setTaskSelected={setTaskSelected}
              key={index}
            />
          ))}
        </div>
        <div
          className={`border-border-muted flex h-full shrink-0 flex-col overflow-x-hidden border-l p-6 transition-all ${taskSelected ? "w-1/2" : "hidden w-0"}`}
        >
          <h3 className="font-medium">{taskSelected?.title}</h3>
          other stuff...
        </div>
      </div>
    </div>
  );
}
