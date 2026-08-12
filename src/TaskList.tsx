import type { Task } from "./types";
import { TaskItem } from "./TaskItem";

interface TaskListProps {
  tasks: Task[];
}

export function TaskList({tasks}: TaskListProps) {
    return (
        <ul>
            {tasks.map((task) => (
                <TaskItem 
                    key={task.id}
                    task={task}
                />
            ))}
        </ul>
    );
}
