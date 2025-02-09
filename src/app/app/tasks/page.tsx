"use client";
import { useState, useEffect } from "react";
import { faker } from "@faker-js/faker";
import { TaskItem, TaskItemProps } from "@/app/components/information/TaskItem";
import { renderMarkdown } from "@/app/utils/types/renderMarkdown";
import { ListFilter } from "lucide-react";
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

const fakeTasks = Array.from({ length: 20 }).map((_, index) => {
  const task: TaskItemProps = {
    uuid: faker.string.uuid(), // Generates a unique UUID
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
  const [taskSelected, setTaskSelected] = useState<TaskItemProps | null>(null);
  const [taskHtmlContent, setTaskHtmlContent] = useState<string | null>(null);

  useEffect(() => {
    const fetchRenderedMarkdown = async () => {
      if (!taskSelected?.body) return;

      try {
        const markdown = atob(taskSelected.body);
        const res = await renderMarkdown(markdown);
        setTaskHtmlContent(res.contentHtml);
      } catch (err) {
        console.error("Error rendering markdown:", err);
      }
    };

    fetchRenderedMarkdown();
  }, [taskSelected]);

  return (
    <div className="flex h-full w-full flex-col overflow-x-hidden">
      <div className="border-border-muted flex h-14 w-full shrink-0 items-center border-b px-4">
        <h3 className="font-medium">Tasks</h3>
      </div>
      <div className="flex h-full w-full">
        <div
          className={`flex shrink-0 flex-col transition-all ${taskSelected ? "w-1/2" : "w-full"}`}
        >
          <div className="bg-surface-1 border-border-muted flex h-9 w-full items-center justify-start border-b px-4 py-1">
            <Dropdown className="flex h-full items-center">
              <DropdownTrigger>
                <div className="hover:bg-surface-2 flex h-full cursor-pointer items-center justify-center space-x-2 rounded px-[0.344rem]">
                  <ListFilter size={16} className="stroke-text-secondary" />
                  <p className="text-text-muted text-sm">Filters</p>
                </div>
              </DropdownTrigger>
              <DropdownMenu position="left">
                <div className="border-border bg-surface-1 text-text-secondary flex w-64 flex-col items-start justify-start rounded border py-2">
                  <div className="mb-2 px-4">
                    <p className="text-text-primary text-lg">Filters</p>
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
              setTaskSelected={setTaskSelected}
              key={task.uuid} // Use UUID as a unique key
            />
          ))}
        </div>
        <div
          className={`border-border-muted flex h-full shrink-0 flex-col overflow-x-hidden border-l p-6 transition-all ${taskSelected ? "w-1/2" : "hidden w-0"}`}
        >
          {taskSelected ? (
            <>
              <h2 className="text-text-primary mb-4 font-medium">
                {taskSelected?.title}
              </h2>
              {taskHtmlContent ? (
                <div
                  className="[&>pre]:bg-surface-1 [&>pre]:border-border [&>p]:text-text-secondary flex flex-col space-y-2 [&>h3]:mt-4 [&>pre]:overflow-x-auto [&>pre]:rounded [&>pre]:border [&>pre]:p-4"
                  dangerouslySetInnerHTML={{ __html: taskHtmlContent }}
                />
              ) : (
                <p>No body for this task.</p>
              )}
            </>
          ) : (
            <p>Loading</p>
          )}
        </div>
      </div>
    </div>
  );
}
