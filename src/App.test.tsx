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
