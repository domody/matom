import { cn } from "@/app/utils/cn";
import { Ellipsis } from "lucide-react";
import * as React from "react";
import { Dispatch, SetStateAction } from "react";
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
// Priority Icons
import { AlertOctagon, ChevronUp, Equal, ChevronDown } from "lucide-react";

const priorityIconMap: { [key: string]: React.ElementType } = {
  Low: ChevronDown,
  Medium: Equal,
  High: ChevronUp,
  Critical: AlertOctagon,
};

// Status Icons
import {
  CircleDashed,
  Clock,
  CircleCheck,
  CircleDotDashed,
  CircleMinus,
} from "lucide-react";

const statusIconMap: { [key: string]: React.ElementType } = {
  Pending: CircleDashed,
  InProgress: Clock,
  InReview: CircleDotDashed,
  Completed: CircleCheck,
  Blocked: CircleMinus,
};

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

  return `${month} ${day.split(" ")[0]} ${yearIncl ? year : ""}`; // "06 Feb 2025"
}

export function TaskItemTag({ tag }: { tag: string }) {
  return (
    <div className="border-border bg-primary text-text-secondary hover:bg-surface-2 hover:text-text-primary cursor-pointer rounded-full border px-2 py-1 text-xs text-nowrap transition-all">
      {tag}
    </div>
  );
}

export interface TaskItemProps {
  team: string;
  id: number;
  status: "Pending" | "InProgress" | "InReview" | "Completed" | "Blocked";
  title: string;
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

export function TaskItem({
  task,
  setTaskSelected,
}: {
  task: TaskItemProps;
  setTaskSelected: Dispatch<SetStateAction<TaskItemProps | null>>;
}) {
  const priorityIconStyleClass = {
    Low: "stroke-text-muted",
    Medium: "stroke-text-muted",
    High: "stroke-text-muted",
    Critical: "stroke-red-500",
  }[task.priority];

  const PriorityIconComponent = task.priority
    ? priorityIconMap[task.priority]
    : null;

  const statusIconStyleClass = {
    Pending: "stroke-text-muted",
    InProgress: "stroke-orange-400",
    InReview: "stroke-blue-400",
    Completed: "stroke-green-400",
    Blocked: "stroke-red-500",
  }[task.status];

  const StatusIconComponent = task.status ? statusIconMap[task.status] : null;
  return (
    <div
      className="border-border hover:bg-surface-1 flex h-9 w-full cursor-pointer items-center justify-start gap-x-4 border-b px-4 py-1 text-sm transition-all"
      onClick={() => setTaskSelected(task)}
    >
      <div className="hover:bg-surface-2 flex aspect-square h-full shrink-0 cursor-pointer items-center justify-center rounded transition-all">
        {PriorityIconComponent && (
          <PriorityIconComponent
            size={16}
            className={`${priorityIconStyleClass}`}
          />
        )}
      </div>
      <p className="text-text-muted w-16 shrink-0">
        {task.team.slice(0, 3).toUpperCase()}-{task.id}
      </p>
      <div className="hover:bg-surface-2 flex aspect-square h-full shrink-0 cursor-pointer items-center justify-center rounded transition-all">
        {StatusIconComponent && (
          <StatusIconComponent
            size={16}
            className={`${statusIconStyleClass}`}
          />
        )}
      </div>
      <p className="text-text-secondary line-clamp-1 w-full">{task.title}</p>
      <TaskItemTagWrapper>
        {task.tags.map((tag, index) => (
          <TaskItemTag tag={tag} key={index} />
        ))}
      </TaskItemTagWrapper>
      <p className="srhink-0 text-text-secondary text-nowrap">
        {getDateString(task.lastUpdated)}
      </p>
      <p className="srhink-0 text-text-secondary text-nowrap">
        {getDateString(task.endDate)}
      </p>
      <div className="hover:bg-surface-2 flex aspect-square h-full shrink-0 cursor-pointer items-center justify-center rounded transition-all">
        <Ellipsis size={16} className="stroke-text-muted" />
      </div>
    </div>
  );
}
