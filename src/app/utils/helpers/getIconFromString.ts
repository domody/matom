// Status Icons
import {
  CircleDashed,
  Clock,
  CircleCheck,
  CircleDotDashed,
  CircleMinus,
} from "lucide-react";

export const statusIconMap: { [key: string]: React.ElementType } = {
  Pending: CircleDashed,
  InProgress: Clock,
  InReview: CircleDotDashed,
  Completed: CircleCheck,
  Blocked: CircleMinus,
};

// Convert style objects to functions
export const statusIconStyleClass = (status: string) => {
  return (
    {
      Pending: "stroke-text-muted",
      InProgress: "stroke-orange-400",
      InReview: "stroke-blue-400",
      Completed: "stroke-green-400",
      Blocked: "stroke-red-500",
    }[status] || "stroke-text-muted"
  ); // Default fallback
};

export const statusBackgroundStyleClass = (status: string) => {
  return (
    {
      Pending: "bg-surface-1 hover:bg-surface-2",
      InProgress: "bg-orange-400/5 hover:bg-orange-400/15",
      InReview: "bg-blue-400/5 hover:bg-blue-400/15",
      Completed: "bg-green-400/5 hover:bg-green-400/15",
      Blocked: "bg-red-400/10 hover:bg-red-400/20",
    }[status] || "bg-surface-1 hover:bg-surface-2"
  ); // Default fallback
};

// Priority Icons
import { AlertOctagon, ChevronUp, Equal, ChevronDown } from "lucide-react";

export const priorityIconMap: { [key: string]: React.ElementType } = {
  Low: ChevronDown,
  Medium: Equal,
  High: ChevronUp,
  Critical: AlertOctagon,
};

// Convert priority styles to functions
export const priorityIconStyleClass = (priority: string) => {
  return (
    {
      Low: "stroke-text-muted",
      Medium: "stroke-text-muted",
      High: "stroke-text-muted",
      Critical: "stroke-red-500",
    }[priority] || "stroke-text-muted"
  );
};

export const priorityBackgroundStyleClass = (priority: string) => {
  return (
    {
      Low: "hover:bg-surface-2",
      Medium: "hover:bg-surface-2",
      High: "hover:bg-surface-2",
      Critical: "hover:bg-red-400/20",
    }[priority] || "hover:bg-surface-2"
  );
};
