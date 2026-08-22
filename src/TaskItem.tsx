import type { Task } from "./types";

interface TaskItemProps {
  task: Task;
  handleToggle: (id: string) => void;
  handleDelete: (id: string) => void;
}

export function TaskItem({ task, handleToggle , handleDelete}: TaskItemProps) {
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
      <button 
        aria-label={`delete ${task.title}`}
        onClick={() => handleDelete(task.id)}
        >Delete</button>
    </li>
  );
}
