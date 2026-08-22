import type { Task } from "./types";
import { TaskItem } from "./TaskItem";

interface TaskListProps {
  tasks: Task[];
  handleToggle: (id: string) => void;
  handleDelete: (id: string) => void;
}

export function TaskList({tasks, handleToggle, handleDelete}: TaskListProps) {
    return (
        <ul>
            {tasks.map((task) => (
                <TaskItem 
                    key={task.id}
                    task={task}
                    handleToggle={handleToggle}
                    handleDelete={handleDelete}
                />
            ))}
        </ul>
    );
}
