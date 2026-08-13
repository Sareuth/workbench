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