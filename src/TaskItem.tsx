import type { Task } from "./types";

interface TaskItemProps {
  task: Task;
  handleToggle: (id: string) => void;
}

export function TaskItem({ task, handleToggle }: TaskItemProps) {
  const checkboxId = `task-${task.id}`;

  return (
    <li>
      <input
        id={checkboxId}
        type="checkbox"
        checked={task.completed}
        onChange={() => handleToggle(task.id)}
      />
      <label htmlFor={checkboxId}>{task.title}</label>
    </li>
  );
}
