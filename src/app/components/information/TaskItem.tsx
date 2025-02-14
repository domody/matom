import { cn } from "@/app/utils/cn";
import { Ellipsis } from "lucide-react";
import * as React from "react";
import { Dispatch, SetStateAction } from "react";
import {
  statusIconMap,
  statusIconStyleClass,
  statusBackgroundStyleClass,
  priorityIconMap,
  priorityIconStyleClass,
  priorityBackgroundStyleClass,
} from "@/app/utils/helpers/getIconFromString";
import { 
  Dropdown, 
  DropdownMenu, 
  DropdownTrigger,
  DropdownItem,
} from "@/app/components/information/Dropdown";
/*
Pass: 
 - Team
 - ID number
 - Status
 - Title
 - Tags
 - Start & End date
 - Assigned users
*/

export function TaskItemTagWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-end space-x-1">{children}</div>
  );
}

function getDateString(date: string, yearIncl: boolean = false) {
  const splitDate = date.split("-");

  const getMonth = (month: string) => {
    switch (month) {
      case "01":
        return "Jan";
      case "02":
        return "Feb";
      case "03":
        return "Mar";
      case "04":
        return "Apr";
      case "05":
        return "May";
      case "06":
        return "Jun";
      case "07":
        return "Jul";
      case "08":
        return "Aug";
      case "09":
        return "Sep";
      case "10":
        return "Oct";
      case "11":
        return "Nov";
      case "12":
        return "Dec";
      default:
        return "Invalid";
    }
  };

  const year = splitDate[0];
  const month = getMonth(splitDate[1]);
  const day = splitDate[2];

  return `${month} ${day.split("T")[0]} ${yearIncl ? year : ""}`; // "06 Feb 2025"
}

export function TaskItemTag({ tag, toggleFilter }: { tag: string; toggleFilter: (category: string, option: string) => void; }) {
  return (
    <div 
    className="border-border bg-primary text-text-muted hover:bg-surface-2 hover:text-text-secondary cursor-pointer rounded-full border px-2 py-1 text-xs text-nowrap transition-all"
    onClick={(e) =>  {
      toggleFilter("tags", tag)
      e.stopPropagation()
    }}    
    >
      {tag}
    </div>
  );
}

export interface TaskProps {
  uuid: string;
  team: string;
  id: number;
  status: "Pending" | "InProgress" | "InReview" | "Completed" | "Blocked";
  title: string;
  body: string;
  tags: string[];
  startDate: string;
  endDate: string;
  assignedUsers: string[];
  priority: "Low" | "Medium" | "High" | "Critical";
  estimatedEffort: string;
  progress: number;
  type: string;
  lastUpdated: string;
}


interface TaskItemProps {
  task: TaskProps;
  handleTaskClick: (task: TaskProps) => void;
  toggleFilter: (category: string, option: string) => void;
  isSelected: boolean;
}

export function TaskItem({ task, handleTaskClick, toggleFilter, isSelected }: TaskItemProps) {
  const PriorityIconComponent = task.priority
    ? priorityIconMap[task.priority]
    : null;
  const StatusIconComponent = task.status ? statusIconMap[task.status] : null;
  return (
    <div
      className={`hover:bg-surface-1 border-border flex h-9 w-full cursor-pointer items-center justify-start gap-x-4 border-b px-4 py-1 text-sm transition-all ${isSelected ? "bg-surface-1" : ""}`}
      onClick={() => handleTaskClick(task)}
    >
      <div
        className={`flex aspect-square h-full shrink-0 cursor-pointer items-center justify-center rounded transition-all ${priorityBackgroundStyleClass(task.priority)}`}
        onClick={(e) =>  {
          toggleFilter("priority", task.priority)
          e.stopPropagation()
        }}
      >
        {PriorityIconComponent && (
          <PriorityIconComponent
            size={16}
            className={`${priorityIconStyleClass(task.priority)}`}
          />
        )}
      </div>
      <p className="text-text-muted w-16 shrink-0">
        {task.team.slice(0, 3).toUpperCase()}-{task.id}
      </p>
      <div
        className={`flex aspect-square h-full shrink-0 cursor-pointer items-center justify-center rounded transition-all ${statusBackgroundStyleClass(task.status)}`}
        onClick={(e) =>  {
          toggleFilter("status", task.status)
          e.stopPropagation()
        }}
      >
        {StatusIconComponent && (
          <StatusIconComponent
            size={16}
            className={`${statusIconStyleClass(task.status)}`}
          />
        )}
      </div>
      <p className="text-text-secondary line-clamp-1 w-full">{task.title}</p>
      <TaskItemTagWrapper>
        {task.tags.map((tag, index) => (
          <TaskItemTag tag={tag} key={index} toggleFilter={toggleFilter} />
        ))}
      </TaskItemTagWrapper>
      <p className="srhink-0 text-text-muted w-20 text-left text-nowrap">
        {getDateString(task.lastUpdated)}
      </p>
      <p className="srhink-0 text-text-muted w-20 text-left text-nowrap">
        {getDateString(task.endDate)}
      </p>
      <Dropdown className="h-full">
        <DropdownTrigger className="">
          <div className="hover:bg-surface-2 flex aspect-square h-full shrink-0 cursor-pointer items-center justify-center rounded transition-all">
            <Ellipsis size={16} className="stroke-text-muted" />
          </div>
        </DropdownTrigger>
        <DropdownMenu position="right">
          <div className="w-40 flex justify-center items-center flex-col p-1 rounded border border-border bg-surface-1">
            <DropdownItem option="Edit"/>
            <DropdownItem option="Duplicate"/>
            <DropdownItem option="Favourite"/>
            <hr className="w-full border-border my-1"/>
            <DropdownItem option="Tags"/>
            <hr className="w-full border-border my-1"/>
            <DropdownItem option="Delete"/>
          </div>
        </DropdownMenu>
      </Dropdown>

    </div>
  );
}

import { LucideIcon } from "lucide-react";

interface TaskInfoProps {
  icon: LucideIcon;
  info: string;
  data: React.ReactNode;
}

export function TaskInfo({ icon: Icon, info, data }: TaskInfoProps) {
  return (
    <div className="flex items-center justify-start gap-x-2">
      <div className="flex w-36 items-center justify-start gap-x-2">
        <Icon size={16} className="stroke-text-muted" />
        <p>{info}</p>
      </div>
      <div>{data}</div>
    </div>
  );
}
