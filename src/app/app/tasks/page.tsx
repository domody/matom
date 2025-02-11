"use client";
import * as React from "react";
import { useState, useEffect } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import useEscapeKey from "@/app/hooks/useEscapeKey";
import { faker } from "@faker-js/faker";
import {
  TaskInfo,
  TaskItem,
  TaskProps,
} from "@/app/components/information/TaskItem";
import { renderMarkdown } from "@/app/utils/helpers/renderMarkdown";
import {
  ListFilter,
  X,
  CircleDot,
  CircleFadingArrowUp,
  CalendarDays,
  Users,
  Tags,
  Maximize2,
  Minimize2,
  SquarePen,
} from "lucide-react";
import {
  Dropdown,
  DropdownMenu,
  DropdownTrigger,
} from "@/app/components/information/Dropdown";
import {
  FiltersDropdown,
  FiltersDropdownItem,
  FiltersDropdownOption,
} from "@/app/components/information/FiltersDropdown";
import {
  statusIconMap,
  statusIconStyleClass,
  statusBackgroundStyleClass,
  priorityIconMap,
  priorityIconStyleClass,
  priorityBackgroundStyleClass,
} from "@/app/utils/helpers/getIconFromString";

const fakeTasks = Array.from({ length: 45 }).map((_, index) => {
  const task: TaskProps = {
    uuid: index === 5 ? "helloworld" : faker.string.uuid(), // First task gets 'helloworld' UUID
    team: faker.company.name(), // Random team name
    id: faker.number.int({ min: 100, max: 999 }), // Short task ID (e.g., 304)
    status: faker.helpers.arrayElement([
      "Pending",
      "InProgress",
      "InReview",
      "Completed",
      "Blocked",
    ]), // Random status from allowed values
    title: faker.lorem.words(4), // Generates a 4-word title
    // body: faker.lorem.words({ min: 25, max: 100 }),
    body: "c2FudGFpLmdnIGlzIGFuIG9wZW5zb3VyY2UgcHJvamVjdCBob3N0ZWQgYnkgW2xpbWl0XShodHRwczovL2xpbWl0ZWRpby5jb20vKSBhbmQgW2hhZnRdKGh0dHBzOi8vd3d3LmthZGlybG9mY2EuY29tLyksIHdoaWNoIGFjdHMgYXMgYSB0cmFja2VyIHNlcnZpY2UgZm9yIHRoZSBnYW1lICdTcGVjdHJlIERpdmlkZScuCnRoZSBzaXRlIG1ha2VzIHVzZSBvZiBhbiBbQVBJXShodHRwczovL3dhdmVzY2FuLXByb2R1Y3Rpb24udXAucmFpbHdheS5hcHAvYXBpL3YxL3N3YWdnZXIpIGNyZWF0ZWQgYnkgbGltaXQsIHdoaWNoIG1hZGUgdGhlIHByb2NjZXNzIG9mIHB1bGxpbmcgZ2FtZSBkYXRhIG11Y2ggc21vb3RoZXIuCgojIyMgQ29udHJpYnV0aW9ucwoKd29ya2VkIG9uIHRoZSBzZWNvbmQgdmVyc2lvbiBvZiB0aGUgc2FudGFpLmdnIHdlYnNpdGUgZm9yIHRoZSBzZWFzb24gMSBsYXVuY2ggb2YgU3BlY3RyZSBEaXZpZGUsIGluIHdoaWNoIGkgY3JlYXRlZCB0aGUgbGVhZGVyYm9hcmQgYW5kIHBsYXllciBwcm9maWxlIHBhZ2VzLCBhc3dlbGwgYXMgaGVscGluZyBvbiB0aGUgaG9tZSBwYWdlIG9mIHRoZSBzaXRlLgoKYGBgdHN4CmludGVyZmFjZSBQcm9wIHsKICBuYW1lOiBzdHJpbmc7CiAgaWQ6IG51bWJlcjsKfQoKZnVuY3Rpb24gTXlDb21wb25lbnQocHJvcHM6IFByb3ApIHsKICByZXR1cm4gKAogICAgPGRpdj4KICAgICAgPGgxPkhlbGxvLCB7cHJvcHMubmFtZX0hPC9oMT4KICAgICAgPHA+VGhpcyBpcyBhbiBleGFtcGxlIFJlYWN0IGNvbXBvbmVudC48L3A+CiAgICA8L2Rpdj4KICApOwp9CmBgYAo=",
    tags: faker.helpers.arrayElements(
      ["Bug", "Feature", "Enhancement", "Critical", "Design"],
      2,
    ), // Randomly selects 2 tags
    startDate: faker.date.recent({ days: 10 }).toISOString().split("T")[0], // Generates a recent date
    endDate: faker.date.future().toISOString().split("T")[0], // Generates a future date
    assignedUsers: faker.helpers.arrayElements(
      ["Alice", "Bob", "Charlie", "Dave", "Eve"],
      2,
    ), // Selects 2 random users
    priority: faker.helpers.arrayElement(["Low", "Medium", "High", "Critical"]),
    estimatedEffort: `${faker.number.int({ min: 1, max: 4 })} weeks`, // Generates effort in weeks
    progress: faker.number.int({ min: 0, max: 100 }), // Random progress percentage
    type: faker.helpers.arrayElement(["Bug", "Feature", "Task", "Epic"]),
    lastUpdated: faker.date.recent().toISOString(), // ISO format for timestamp
  };

  return task;
});

/*
Feature by:
tag
priority
status
team
last updated
due date
*/

export default function Tasks() {
  const [selectedTask, setSelectedTask] = useState<TaskProps | null>(null);
  const [taskVisible, setTaskVisible] = useState<boolean>(false);
  const [taskMaximised, setTaskMaximised] = useState<boolean>(false);
  const [taskHtmlContent, setTaskHtmlContent] = useState<string | null>(null);

  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  useEffect(() => {
    const taskId = searchParams.get('tk');
    if (taskId) {
      const task = fakeTasks.find(t => t.uuid === taskId);
      if (task) {
        setTaskVisible(true)
        setSelectedTask(task);
      }
    }
  }, [searchParams, fakeTasks]);

  const handleTaskClick = (task: TaskProps) => {
    setSelectedTask(task);
    setTaskVisible(true)
    const newUrl = `${pathname}?tk=${task.uuid}`;
    console.log(newUrl)
    router.push(newUrl, { scroll: false });
  };

  useEffect(() => {
    const fetchRenderedMarkdown = async () => {
      if (!selectedTask?.body) return;

      try {
        const markdown = atob(selectedTask.body);
        const res = await renderMarkdown(markdown);
        setTaskHtmlContent(res.contentHtml);
      } catch (err) {
        console.error("Error rendering markdown:", err);
      }
    };

    fetchRenderedMarkdown();
  }, [selectedTask]);

  useEscapeKey(() => {
    if (selectedTask) {
      setTaskVisible(false);
      setTaskMaximised(false);
    }
  });

  return (
    <>
      <div
        className={`flex h-full flex-col overflow-hidden overflow-x-hidden transition-all ${taskVisible ? (taskMaximised ? "w-0" : "w-2/3") : "w-full"}`}
      >
        <div className="border-border-muted flex h-14 w-full shrink-0 items-center border-b px-4">
          <h3 className="font-medium">Tasks</h3>
        </div>
        <div className="flex h-full w-full">
          <div className="scrollbar-hide flex w-full shrink-0 flex-col overflow-y-auto pb-36 transition-all">
            <div className="bg-surface-1 border-border-muted flex h-9 w-full shrink-0 items-center justify-start border-b px-4 py-1">
              <Dropdown className="flex h-full items-center">
                <DropdownTrigger>
                  <div className="hover:bg-surface-2 flex h-full cursor-pointer items-center justify-center space-x-2 rounded px-[0.344rem]">
                    <ListFilter size={16} className="stroke-text-secondary" />
                    <p className="text-text-muted text-sm">Filters</p>
                  </div>
                </DropdownTrigger>
                <DropdownMenu position="left">
                  <div className="border-border bg-surface-1 text-text-secondary flex w-64 flex-col items-start justify-start rounded border py-2">
                    <div className="mb-2 w-full px-4">
                      <p className="text-text-primary font-medium">Filters</p>
                      <hr className="border-border mt-2" />
                    </div>
                    <div className="flex w-full flex-col text-sm">
                      <FiltersDropdown>
                        <FiltersDropdownItem title="Tags">
                          <FiltersDropdownOption option="Bug" />
                          <FiltersDropdownOption option="Feature" />
                          <FiltersDropdownOption option="Enhancement" />
                          <FiltersDropdownOption option="Critical" />
                          <FiltersDropdownOption option="Design" />
                        </FiltersDropdownItem>

                        <FiltersDropdownItem title="Priority">
                          <FiltersDropdownOption option="Low" />
                          <FiltersDropdownOption option="Medium" />
                          <FiltersDropdownOption option="High" />
                          <FiltersDropdownOption option="Critical" />
                        </FiltersDropdownItem>

                        <FiltersDropdownItem title="Status">
                          <FiltersDropdownOption option="Pending" />
                          <FiltersDropdownOption option="In Progress" />
                          <FiltersDropdownOption option="In Review" />
                          <FiltersDropdownOption option="Completed" />
                          <FiltersDropdownOption option="Blocked" />
                        </FiltersDropdownItem>

                        <FiltersDropdownItem title="Team">
                          <FiltersDropdownOption option="Engineering" />
                          <FiltersDropdownOption option="Development" />
                          <FiltersDropdownOption option="Human Resources" />
                          <FiltersDropdownOption option="Marketing" />
                          <FiltersDropdownOption option="Sales" />
                        </FiltersDropdownItem>

                        <FiltersDropdownItem title="Assignees">
                          <FiltersDropdownOption option="Alice" />
                          <FiltersDropdownOption option="Bob" />
                          <FiltersDropdownOption option="Charlie" />
                          <FiltersDropdownOption option="Dave" />
                          <FiltersDropdownOption option="Eve" />
                        </FiltersDropdownItem>

                        <FiltersDropdownItem title="Due Date">
                          <FiltersDropdownOption option="Today" />
                          <FiltersDropdownOption option="This Week" />
                          <FiltersDropdownOption option="This Month" />
                          <FiltersDropdownOption option="Overdue" />
                          <FiltersDropdownOption option="Custom Range..." />
                        </FiltersDropdownItem>

                        <FiltersDropdownItem title="Last Updated">
                          <FiltersDropdownOption option="Last 24 Hours" />
                          <FiltersDropdownOption option="Last 7 Days" />
                          <FiltersDropdownOption option="Last 30 Days" />
                          <FiltersDropdownOption option="Last 6 Months" />
                          <FiltersDropdownOption option="Custom Range..." />
                        </FiltersDropdownItem>
                      </FiltersDropdown>
                    </div>
                  </div>
                </DropdownMenu>
              </Dropdown>
            </div>
            {fakeTasks.map((task, index) => (
              <TaskItem
                task={task}
                handleTaskClick={handleTaskClick}
                setSelectedTask={setSelectedTask}
                isSelected={
                  selectedTask ? task.uuid == selectedTask.uuid : false
                }
                setTaskVisible={setTaskVisible}
                key={task.uuid} // Use UUID as a unique key
              />
            ))}
          </div>
        </div>
      </div>
      <div
        className={`border-border-muted flex h-full flex-col overflow-hidden overflow-x-hidden border-l transition-all ${taskVisible ? (taskMaximised ? "w-full border-l-0" : "w-1/3") : "w-0"}`}
      >
        {selectedTask ? (
          <div className="flex shrink-0 flex-col items-start justify-start">
            <div className="border-border-muted flex h-14 w-full items-center justify-between border-b px-4">
              <div className="flex h-full items-center justify-start">
                <div
                  className="hover:bg-surface-1 text-text-muted hover:text-text-secondary cursor-pointer rounded p-1 transition-all"
                  onClick={() => setTaskMaximised(!taskMaximised)}
                >
                  {taskMaximised ? (
                    <Minimize2 size={16} />
                  ) : (
                    <Maximize2 size={16} />
                  )}
                </div>
              </div>
              <div className="flex h-full items-center justify-end">
                <div
                  className="hover:bg-surface-1 text-text-muted hover:text-text-secondary cursor-pointer rounded p-1 transition-all"
                  onClick={() => {
                    setTaskMaximised(false);
                    setTaskVisible(false);
                  }}
                >
                  <X size={16} />
                </div>
              </div>
            </div>
            <div className="flex flex-col p-6">
              <h2 className="text-text-primary mb-4">{selectedTask?.title}</h2>
              <div className="text-text-secondary mb-8 flex flex-col space-y-2">
                <TaskInfo
                  icon={CircleDot}
                  info="Status"
                  data={
                    <div className="flex items-center justify-start gap-x-2">
                      <div
                        className={`cursor-pointer rounded p-[0.334rem] ${statusBackgroundStyleClass(selectedTask.status)}`}
                      >
                        {React.createElement(
                          statusIconMap[selectedTask.status],
                          {
                            size: 16,
                            className: statusIconStyleClass(
                              selectedTask.status,
                            ),
                          },
                        )}
                      </div>
                      <p>
                        {selectedTask.status.replace(/([A-Z])/g, " $1").trim()}
                      </p>
                    </div>
                  }
                />
                <TaskInfo
                  icon={CircleFadingArrowUp}
                  info="Priority"
                  data={
                    <div className="flex items-center justify-start gap-x-2">
                      <div
                        className={`cursor-pointer rounded p-[0.334rem] ${priorityBackgroundStyleClass(selectedTask.priority)}`}
                      >
                        {React.createElement(
                          priorityIconMap[selectedTask.priority],
                          {
                            size: 16,
                            className: priorityIconStyleClass(
                              selectedTask.priority,
                            ),
                          },
                        )}
                      </div>
                      <p>
                        {selectedTask.priority
                          .replace(/([A-Z])/g, " $1")
                          .trim()}
                      </p>
                    </div>
                  }
                />
                <TaskInfo
                  icon={CalendarDays}
                  info="Due Date"
                  data={<p>{selectedTask.endDate}</p>}
                />
                <TaskInfo
                  icon={Users}
                  info="Assignees"
                  data={
                    <div className="flex flex-wrap items-center justify-start gap-x-2">
                      {selectedTask.assignedUsers.map((user, index) => {
                        const tailwindColors = [
                          "bg-red-400/5 hover:bg-red-400/20",
                          "bg-blue-400/5 hover:bg-blue-400/20",
                          "bg-green-400/5 hover:bg-green-400/20",
                          "bg-purple-400/5 hover:bg-purple-400/20",
                          "bg-pink-400/5 hover:bg-pink-400/20",
                          "bg-indigo-400/5 hover:bg-indigo-400/20",
                        ];

                        const randomColor =
                          tailwindColors[
                            Math.floor(Math.random() * tailwindColors.length)
                          ];

                        return (
                          <div
                            key={index}
                            className={`flex cursor-pointer items-center justify-center rounded-full px-3 py-0.5 text-sm transition-all ${randomColor}`}
                          >
                            {user}
                          </div>
                        );
                      })}
                    </div>
                  }
                />

                <TaskInfo
                  icon={Tags}
                  info="Tags"
                  data={
                    <div className="flex flex-wrap items-center justify-start gap-x-2">
                      {selectedTask.tags.map((tag, index) => {
                        const tailwindColors = [
                          "bg-red-400/10 hover:bg-red-400/20 text-red-300",
                          "bg-blue-400/10 hover:bg-blue-400/20 text-blue-300",
                          "bg-green-400/10 hover:bg-green-400/20 text-green-300",
                          "bg-purple-400/10 hover:bg-purple-400/20 text-purple-300",
                          "bg-pink-400/10 hover:bg-pink-400/20 text-pink-300",
                          "bg-indigo-400/10 hover:bg-indigo-400/20 text-indigo-300",
                        ];

                        const randomColor =
                          tailwindColors[
                            Math.floor(Math.random() * tailwindColors.length)
                          ];

                        return (
                          <div
                            key={index}
                            className={`flex cursor-pointer items-center justify-center rounded px-2 py-0.5 text-sm transition-all ${randomColor}`}
                          >
                            {tag}
                          </div>
                        );
                      })}
                    </div>
                  }
                />
              </div>
              {taskHtmlContent ? (
                <div
                  className="[&>pre]:bg-surface-1 [&>pre]:border-border [&>p]:text-text-secondary flex flex-col space-y-2 [&>h3]:mt-4 [&>pre]:overflow-x-auto [&>pre]:rounded [&>pre]:border [&>pre]:p-4"
                  dangerouslySetInnerHTML={{ __html: taskHtmlContent }}
                />
              ) : (
                <p>No body for this task.</p>
              )}
            </div>
          </div>
        ) : (
          <p>Loading</p>
        )}
      </div>
    </>
  );
}
