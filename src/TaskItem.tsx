import type { Task } from "./types";

interface TaskItemProps {
  task: Task;
  handleToggle: (id: string) => void
}

export function TaskItem({ task, handleToggle }: TaskItemProps) {
  return (
    <li>
      <input type="checkbox" checked={task.completed} onChange={() => handleToggle(task.id)} />
      <span>{task.title}</span>
    </li>
  );
}