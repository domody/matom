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
  Share2,
  Copy,
  Check,
  SlidersHorizontal,
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

  const [selectedFilters, setSelectedFilters] = useState({
    tags: new Set(),
    priority: new Set(),
    status: new Set(),
    team: new Set(),
    assignees: new Set(),
    dueDate: new Set(),
    lastUpdated: new Set(),
  });

  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  useEffect(() => {
    const taskId = searchParams.get("tk");
    if (taskId) {
      const task = fakeTasks.find((t) => t.uuid === taskId);
      if (task) {
        setTaskVisible(true);
        setSelectedTask(task);
      } else {
        router.replace(pathname, { scroll: false });
      }
    }
  }, [searchParams, fakeTasks]);

  const handleTaskClick = (task: TaskProps) => {
    setSelectedTask(task);
    setTaskVisible(true);
    const newUrl = `${pathname}?tk=${task.uuid}`;
    console.log(newUrl);
    router.replace(newUrl, { scroll: false });
  };

  const closeTask = () => {
    setTaskMaximised(false);
    setTaskVisible(false);
    router.replace(pathname, { scroll: false });
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
      closeTask();
    }
  });

  const priorityOrder = ["Critical", "High", "Medium", "Low"];
  const statusOrder = ["InProgress", "Pending", "InReview", "Blocked", "Completed"];

  const sortedTasks = [...fakeTasks].sort(
    (a: TaskProps, b: TaskProps) =>
      statusOrder.indexOf(a.status) - statusOrder.indexOf(b.status)
  );

  const filteredTasks = sortedTasks.filter((task) => {
    return (
      (selectedFilters.tags.size === 0 ||
        selectedFilters.tags.has(task.tags[0])) &&
      (selectedFilters.priority.size === 0 ||
        selectedFilters.priority.has(task.priority)) &&
      (selectedFilters.status.size === 0 ||
        selectedFilters.status.has(task.status)) &&
      (selectedFilters.team.size === 0 ||
        selectedFilters.team.has(task.team)) &&
      (selectedFilters.assignees.size === 0 ||
        task.assignedUsers.some((user) => selectedFilters.assignees.has(user)))
    );
  });

  const toggleFilter = (category: string, option: string) => {
    console.log("hello");
    setSelectedFilters((prev) => {
      const updatedFilters = new Set(prev[category]);
      if (updatedFilters.has(option)) {
        updatedFilters.delete(option);
      } else {
        updatedFilters.add(option);
      }
      return { ...prev, [category]: updatedFilters };
    });
  };

  const clearFilters = () => {
    setSelectedFilters({
      tags: new Set(),
      priority: new Set(),
      status: new Set(),
      team: new Set(),
      assignees: new Set(),
      dueDate: new Set(),
      lastUpdated: new Set(),
    });
  };


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
            <div className="bg-surface-1 border-border-muted sticky top-0 left-0 flex h-9 w-full shrink-0 items-center justify-start space-x-4 border-b px-4 py-1">
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
                          {[
                            "Bug",
                            "Feature",
                            "Enhancement",
                            "Critical",
                            "Design",
                          ].map((tag) => (
                            <FiltersDropdownOption
                              key={tag}
                              option={tag}
                              onClick={() => toggleFilter("tags", tag)}
                              isActive={selectedFilters.tags.has(tag)}
                            />
                          ))}
                        </FiltersDropdownItem>

                        <FiltersDropdownItem title="Priority">
                          {["Low", "Medium", "High", "Critical"].map(
                            (priority) => (
                              <FiltersDropdownOption
                                key={priority}
                                option={priority}
                                onClick={() =>
                                  toggleFilter("priority", priority)
                                }
                                isActive={selectedFilters.priority.has(
                                  priority,
                                )}
                              />
                            ),
                          )}
                        </FiltersDropdownItem>

                        <FiltersDropdownItem title="Status">
                          {[
                            "Pending",
                            "InProgress",
                            "InReview",
                            "Completed",
                            "Blocked",
                          ].map((status) => (
                            <FiltersDropdownOption
                              key={status}
                              option={status}
                              onClick={() => toggleFilter("status", status)}
                              isActive={selectedFilters.status.has(status)}
                            />
                          ))}
                        </FiltersDropdownItem>

                        <FiltersDropdownItem title="Team">
                          {[
                            "Engineering",
                            "Development",
                            "Human Resources",
                            "Marketing",
                            "Sales",
                          ].map((team) => (
                            <FiltersDropdownOption
                              key={team}
                              option={team}
                              onClick={() => toggleFilter("team", team)}
                              isActive={selectedFilters.team.has(team)}
                            />
                          ))}
                        </FiltersDropdownItem>

                        <FiltersDropdownItem title="Assignees">
                          {["Alice", "Bob", "Charlie", "Dave", "Eve"].map(
                            (assignee) => (
                              <FiltersDropdownOption
                                key={assignee}
                                option={assignee}
                                onClick={() =>
                                  toggleFilter("assignees", assignee)
                                }
                                isActive={selectedFilters.assignees.has(
                                  assignee,
                                )}
                              />
                            ),
                          )}
                        </FiltersDropdownItem>

                        <FiltersDropdownItem title="Due Date">
                          {[
                            "Today",
                            "This Week",
                            "This Month",
                            "Overdue",
                            "Custom Range...",
                          ].map((dueDate) => (
                            <FiltersDropdownOption
                              key={dueDate}
                              option={dueDate}
                              onClick={() => toggleFilter("dueDate", dueDate)}
                              isActive={selectedFilters.dueDate.has(dueDate)}
                            />
                          ))}
                        </FiltersDropdownItem>

                        <FiltersDropdownItem title="Last Updated">
                          {[
                            "Last 24 Hours",
                            "Last 7 Days",
                            "Last 30 Days",
                            "Last 6 Months",
                            "Custom Range...",
                          ].map((update) => (
                            <FiltersDropdownOption
                              key={update}
                              option={update}
                              onClick={() =>
                                toggleFilter("lastUpdated", update)
                              }
                              isActive={selectedFilters.lastUpdated.has(update)}
                            />
                          ))}
                        </FiltersDropdownItem>
                      </FiltersDropdown>
                    </div>
                  </div>
                </DropdownMenu>
              </Dropdown>

              {Object.entries(selectedFilters).map(
                ([filterCategory, filterSet]) => {
                  if (filterSet.size === 0) return null; // Hide empty categories

                  return (
                    <div
                      key={filterCategory}
                      className="border-border flex items-center rounded-md border border-dashed text-xs"
                    >
                      <p className="text-text-secondary peer hover:bg-surface-2/75 cursor-pointer rounded-l-md px-3 py-1 transition-all">
                        {String(filterCategory).charAt(0).toUpperCase() +
                          String(filterCategory).slice(1)}
                      </p>
                      <div className="text-text-secondary peer peer-hover:bg-surface-2/75 flex items-center justify-start transition-all">
                        {[...filterSet].map((filterValue) => (
                          <div
                            key={filterValue}
                            className="border-border hover:bg-surface-2/50 cursor-pointer rounded-sm border-l border-dashed px-3 py-1 transition-all"
                            onClick={() => {
                              setSelectedFilters((prevFilters) => {
                                const updatedSet = new Set(
                                  prevFilters[filterCategory],
                                );
                                updatedSet.delete(filterValue);
                                return {
                                  ...prevFilters,
                                  [filterCategory]: updatedSet,
                                };
                              });
                            }}
                          >
                            {String(filterValue)
                              .replace(/([A-Z])/g, " $1")
                              .trim()}
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                },
              )}

              {Object.values(selectedFilters).some((set) => set.size > 0) && (
                <div
                  className="hover:bg-surface-2/50 text-text-muted hover:text-text-primary flex cursor-pointer items-center justify-center space-x-1 rounded-md px-2 py-1 text-sm transition-all"
                  onClick={clearFilters}
                >
                  <X size={16} />
                  <p>Clear</p>
                </div>
              )}

              <div className="p-1.5 rounded hover:bg-surface-3/50 transition-all ml-auto text-text-muted hover:text-text-secondary cursor-pointer">
                <SlidersHorizontal size={16} />
              </div>
            </div>
            {filteredTasks.map((task, index) => (
              <TaskItem
                task={task}
                handleTaskClick={handleTaskClick}
                isSelected={
                  selectedTask ? task.uuid == selectedTask.uuid : false
                }
                toggleFilter={toggleFilter}
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
                  className="hover:bg-surface-1 text-text-muted hover:text-text-secondary cursor-pointer rounded p-1.5 transition-all"
                  onClick={() => setTaskMaximised(!taskMaximised)}
                >
                  {taskMaximised ? (
                    <Minimize2 size={16} />
                  ) : (
                    <Maximize2 size={16} />
                  )}
                </div>
              </div>
              <div className="flex h-full items-center justify-end space-x-1">
                <div className="hover:bg-surface-1 text-text-muted hover:text-text-secondary cursor-pointer rounded p-1.5 transition-all">
                  <SquarePen size={16} />
                </div>
                <Dropdown>
                  <DropdownTrigger>
                    <div className="hover:bg-surface-1 text-text-muted hover:text-text-secondary cursor-pointer rounded p-1.5 transition-all">
                      <Share2 size={16} />
                    </div>
                  </DropdownTrigger>
                  <DropdownMenu position="right">
                    <div className="bg-surface-1 border-border-muted flex flex-col items-start justify-start rounded border py-4 shadow-lg">
                      <div className="mb-2 w-full px-4">
                        <p className="text-text-primary font-medium">Share</p>
                        <hr className="border-border mt-2" />
                      </div>
                      <div className="flex flex-col px-4">
                        <p className="text-text-muted mt-2 mb-0.5 text-sm">
                          Copy Link
                        </p>
                        <div
                          className="group bg-surface-2 border-border group after:from-primary/0 after:to-surface-2 relative cursor-pointer rounded border text-nowrap after:absolute after:top-0 after:right-0 after:h-full after:w-30 after:bg-gradient-to-r after:to-75%"
                          onClick={() => {
                            navigator.clipboard.writeText(
                              `${pathname}?tk=${selectedTask.uuid}`,
                            );
                          }}
                        >
                          <Copy
                            size={16}
                            className="stroke-text-secondary absolute top-2.5 right-2 z-10 opacity-0 transition-all group-hover:opacity-100"
                          />
                          <div className="scrollbar-hide h-full w-full max-w-48 overflow-x-scroll p-2">
                            <p className="text-text-secondary group-hover:text-text-primary text-sm transition-all">
                              ${pathname}?tk=${selectedTask.uuid}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </DropdownMenu>
                </Dropdown>

                <div
                  className="hover:bg-surface-1 text-text-muted hover:text-text-secondary cursor-pointer rounded p-1.5 transition-all"
                  onClick={() => closeTask()}
                >
                  <X size={16} />
                </div>
              </div>
            </div>
            <div className="flex w-full flex-col p-6">
              <h2 className="text-text-primary mb-4">{selectedTask?.title}</h2>
              <div className="text-text-secondary mb-8 flex flex-col space-y-2">
                <TaskInfo
                  icon={CircleDot}
                  info="Status"
                  data={
                    <div className="flex items-center justify-start gap-x-2">
                      <div
                        className={`flex size-7 cursor-pointer items-center justify-center rounded ${statusBackgroundStyleClass(selectedTask.status)}`}
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
                        className={`flex size-7 cursor-pointer items-center justify-center rounded ${priorityBackgroundStyleClass(selectedTask.priority)}`}
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
                  className="prose prose-headings:text-text-secondary prose-a:text-text-secondary prose-a:hover:text-text-primary prose-a:transition-all prose-h3:mt-4 prose-p:text-text-secondary prose-pre:bg-surface-2/50 prose-pre:border-border-muted prose-pre:overflow-x-auto prose-pre:rounded prose-pre:border prose-pre:p-4 flex w-full max-w-none flex-col space-y-2 transition-all"
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
