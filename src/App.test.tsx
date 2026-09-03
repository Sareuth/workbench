import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { expect, test } from "vitest";
import App from "./App";

test("marks an incomplete task as complete when clicked", async () => {
  const user = userEvent.setup();

  render(<App />);

  const checkbox = screen.getByRole("checkbox", {
    name: /render first react components/i,
  });

  expect(checkbox).not.toBeChecked();

  await user.click(checkbox);

  expect(checkbox).toBeChecked();
});

test("marks a complete task as incomplete when clicked", async () => {
  const user = userEvent.setup();

  render(<App />);

  const checkbox = screen.getByRole("checkbox", {
    name: /create workbench repository/i,
  });

  expect(checkbox).toBeChecked();

  await user.click(checkbox);

  expect(checkbox).not.toBeChecked();
});

test("adds a new task when the user submits a title", async () => {
  const user = userEvent.setup();

  render(<App />);

  const input = screen.getByRole("textbox", {
    name: /task title/i,
  });

  await user.type(input, "Write first TDD feature");

  const addButton = screen.getByRole("button", {
    name: /add task/i,
  });

  await user.click(addButton);

  expect(screen.getByText("Write first TDD feature")).toBeInTheDocument();
});

test("deletes an existing task when the user clicks its delete button", async () => {
  const user = userEvent.setup();

  render(<App />);

  const deleteButton = screen.getByRole("button", {
    name: /delete create Workbench repository/i,
  });

  await user.click(deleteButton);

  expect(
    screen.queryByText("Create Workbench repository"),
  ).not.toBeInTheDocument();
});

test("puts a task into edit mode when the user clicks its edit button", async () => {
  const user = userEvent.setup();

  render(<App />);

  const editButton = screen.getByRole("button", {
    name: /edit render first react components/i,
  });

  await user.click(editButton);

  expect(
    screen.getByRole("textbox", {
      name: /render first react components/i,
    }),
  ).toHaveValue("Render first React components");
});

test("shows save and cancel actions when a task is in edit mode", async () => {
  const user = userEvent.setup();

  render(<App />);

  const editButton = screen.getByRole("button", {
    name: /edit render first react components/i,
  });

  await user.click(editButton);

  expect(
    screen.getByRole("button", {
      name: /save/i,
    }),
  ).toBeInTheDocument();

  expect(
    screen.getByRole("button", {
      name: /cancel/i,
    }),
  ).toBeInTheDocument();

  expect(
    screen.queryByRole("button", {
      name: /edit render first react components/i,
    }),
  ).not.toBeInTheDocument();

  expect(
    screen.queryByRole("button", {
      name: /delete render first react components/i,
    }),
  ).not.toBeInTheDocument();
});

test("allows the task title to be changed while in edit mode", async () => {
  const user = userEvent.setup();

  render(<App />);

  const editButton = screen.getByRole("button", {
    name: /edit render first react components/i,
  });

  await user.click(editButton);

  const input = screen.getByRole("textbox", {
    name: /render first react components/i,
  });

  await user.clear(input);

  await user.type(input, "Test edit task");

  expect(input).toHaveValue("Test edit task");
});

test("saving an edited task updates the task title and exits edit mode", async () => {
  const user = userEvent.setup();

  render(<App />);

  const editButton = screen.getByRole("button", {
    name: /edit render first react components/i,
  });

  await user.click(editButton);

  const input = screen.getByRole("textbox", {
    name: /render first react components/i,
  });

  await user.clear(input);

  await user.type(input, "Test edit task");

  const saveButton = screen.getByRole("button", {
    name: /save/i,
  });

  await user.click(saveButton);

  expect(
    screen.getByRole("checkbox", {
      name: /test edit task/i,
    }),
  ).toBeInTheDocument();

  expect(
    screen.queryByRole("textbox", {
      name: /render first react components/i,
    }),
  ).not.toBeInTheDocument();
});

test("cancelling an edit discards the changed title and exits edit mode", async () => {
  const user = userEvent.setup();

  render(<App />);

  const editButton = screen.getByRole("button", {
    name: /edit render first react components/i,
  });

  await user.click(editButton);

  const input = screen.getByRole("textbox", {
    name: /render first react components/i,
  });

  await user.clear(input);

  await user.type(input, "Test edit task");

  const cancelButton = screen.getByRole("button", {
    name: /cancel/i,
  });

  await user.click(cancelButton);

  expect(
    screen.getByRole("checkbox", {
      name: /render first react components/i,
    }),
  ).toBeInTheDocument();

  expect(
    screen.queryByRole("textbox", {
      name: /render first react components/i,
    }),
  ).not.toBeInTheDocument();
});

test("disables filter buttons while a task is in edit mode", async () => {
  const user = userEvent.setup();

  render(<App />);

  const editButton = screen.getByRole("button", {
    name: /edit render first react components/i,
  });

  await user.click(editButton);

  expect(screen.getByRole("button", { name: /all/i })).toBeDisabled();

  expect(screen.getByRole("button", { name: /open/i })).toBeDisabled();

  expect(screen.getByRole("button", { name: /completed/i })).toBeDisabled();
});

test("disables task creation while a task is in edit mode", async () => {
  const user = userEvent.setup();

  render(<App />);

  const editButton = screen.getByRole("button", {
    name: /edit render first react components/i,
  });

  await user.click(editButton);

  expect(screen.getByRole("textbox", { name: /task title/i })).toBeDisabled();

  expect(screen.getByRole("button", { name: /add task/i })).toBeDisabled();
});

test("disables controls on other tasks while a task is in edit mode", async () => {
  const user = userEvent.setup();

  render(<App />);

  const editButton = screen.getByRole("button", {
    name: /edit render first react components/i,
  });

  await user.click(editButton);

  expect(
    screen.getByRole("checkbox", { name: /create workbench repository/i }),
  ).toBeDisabled();

  expect(
    screen.getByRole("button", { name: /edit create workbench repository/i }),
  ).toBeDisabled();

  expect(
    screen.getByRole("button", { name: /delete create workbench repository/i }),
  ).toBeDisabled();
});

test("disables save when the trimmed edited task title is empty", async () => {
  const user = userEvent.setup();

  render(<App />);

  const editButton = screen.getByRole("button", {
    name: /edit render first react components/i,
  });

  await user.click(editButton);

  const input = screen.getByRole("textbox", {
    name: /render first react components/i,
  });

  await user.clear(input);

  await user.type(input, "   ");

  expect(
    screen.getByRole("button", {
      name: /save/i,
    }),
  ).toBeDisabled();
});

test("trims whitespace from the edited task title when saving", async () => {
  const user = userEvent.setup();

  render(<App />);

  const editButton = screen.getByRole("button", {
    name: /edit render first react components/i,
  });

  await user.click(editButton);

  const input = screen.getByRole("textbox", {
    name: /render first react components/i,
  });

  await user.clear(input);

  await user.type(input, "   Test edit task    ");

  const saveButton = screen.getByRole("button", {
    name: /save/i,
  });

  await user.click(saveButton);

  const taskTitle = screen.getByText("Test edit task");

  expect(taskTitle.textContent).toBe("Test edit task");
});

test("does not allow an edited task title to duplicate another task", async () => {
  const user = userEvent.setup();

  render(<App />);

  const editButton = screen.getByRole("button", {
    name: /edit render first react components/i,
  });

  await user.click(editButton);

  const input = screen.getByRole("textbox", {
    name: /render first react components/i,
  });

  await user.clear(input);

  await user.type(input, "cReate workbench Repository");

  expect(
    screen.getByRole("button", {
      name: /save/i,
    }),
  ).toBeDisabled();
});

test("default filter shows all tasks", async () => {
  render(<App />);

  expect(
    screen.getByRole("checkbox", {
      name: /create workbench repository/i,
    }),
  ).toBeInTheDocument();

  expect(
    screen.getByRole("checkbox", {
      name: /render first react components/i,
    }),
  ).toBeInTheDocument();

  expect(
    screen.getByRole("checkbox", {
      name: /add testing/i,
    }),
  ).toBeInTheDocument();
});

test("open shows only incomplete tasks", async () => {
  const user = userEvent.setup();

  render(<App />);

  const filterButton = screen.getByRole("button", {
    name: /open/i,
  });

  await user.click(filterButton);

  expect(
    screen.queryByRole("checkbox", {
      name: /create workbench repository/i,
    }),
  ).not.toBeInTheDocument();

  expect(
    screen.getByRole("checkbox", {
      name: /render first react components/i,
    }),
  ).toBeInTheDocument();

  expect(
    screen.getByRole("checkbox", {
      name: /add testing/i,
    }),
  ).toBeInTheDocument();
});

test("completed shows only completed tasks", async () => {
  const user = userEvent.setup();

  render(<App />);

  const filterButton = screen.getByRole("button", {
    name: /completed/i,
  });

  await user.click(filterButton);

  expect(
    screen.getByRole("checkbox", {
      name: /create workbench repository/i,
    }),
  ).toBeInTheDocument();

  expect(
    screen.queryByRole("checkbox", {
      name: /render first react components/i,
    }),
  ).not.toBeInTheDocument();

  expect(
    screen.queryByRole("checkbox", {
      name: /add testing/i,
    }),
  ).not.toBeInTheDocument();
});

test("switching back to all restores the full list", async () => {
  const user = userEvent.setup();

  render(<App />);

  const openButton = screen.getByRole("button", {
    name: /open/i,
  });

  await user.click(openButton);

  const allButton = screen.getByRole("button", {
    name: /all/i,
  });

  await user.click(allButton);

  expect(
    screen.getByRole("checkbox", {
      name: /create workbench repository/i,
    }),
  ).toBeInTheDocument();

  expect(
    screen.getByRole("checkbox", {
      name: /render first react components/i,
    }),
  ).toBeInTheDocument();

  expect(
    screen.getByRole("checkbox", {
      name: /add testing/i,
    }),
  ).toBeInTheDocument();
});

test("restores saved tasks from localStorage on startup", () => {
  const savedTasks = [
    {
      id: "saved-task-1",
      title: "Persisted task",
      completed: false,
    },
  ];

  localStorage.clear();
  
  localStorage.setItem("workbench.tasks", JSON.stringify(savedTasks));

  render(<App />);

  expect(
    screen.getByRole("checkbox", {
      name: /persisted task/i,
    }),
  ).toBeInTheDocument();
});

test("saves data to localStorage on change", async () => {
  const user = userEvent.setup();

  render(<App />);

  const editButton = screen.getByRole("button", {
    name: /edit render first react components/i,
  });

  await user.click(editButton);

  const input = screen.getByRole("textbox", {
    name: /render first react components/i,
  });

  await user.clear(input);

  await user.type(input, "Test localStorage task");

  const saveButton = screen.getByRole("button", {
    name: /save/i,
  });

  await user.click(saveButton);

  const savedLocal = localStorage.getItem("workbench.tasks");

  expect(savedLocal).not.toBeNull();

  const savedTasks = JSON.parse(savedLocal!);

  expect(savedTasks).toContainEqual({
    id: expect.any(String),
    title: "Test localStorage task",
    completed: false,
  });
});
