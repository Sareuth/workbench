import { cleanup } from "@testing-library/react";
import { afterEach, beforeEach } from "vitest";
import "@testing-library/jest-dom/vitest";
import { testTasks } from "./fixtures";

beforeEach(() =>{
  localStorage.clear();
  localStorage.setItem("workbench.tasks", JSON.stringify(testTasks));
});

afterEach(() => {
  cleanup();
});