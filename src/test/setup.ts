import { cleanup } from "@testing-library/react";
import { afterEach, beforeEach } from "vitest";
import "@testing-library/jest-dom/vitest";

beforeEach(() =>{
  localStorage.clear();
});

afterEach(() => {
  cleanup();
});