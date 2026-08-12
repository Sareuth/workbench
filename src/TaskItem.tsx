import type { Task } from "./types";

interface TaskItemProps {
  task: Task;
}

export function TaskItem({ task }: TaskItemProps) {
  return (
    <li>
      <input type="checkbox" checked={task.completed} readOnly />
      <span>{task.title}</span>
    </li>
  );
}