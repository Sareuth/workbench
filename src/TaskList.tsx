import type { Task } from "./types";
import { TaskItem } from "./TaskItem";

interface TaskListProps {
  tasks: Task[];
  editingTaskID: string | null;
  handleToggle: (id: string) => void;
  handleDelete: (id: string) => void;
  handleEdit: (id: string) => void;
  canSave: (title: string) => boolean;
  handleSave: (title: string) => void;
  handleCancel: () => void;
}

export function TaskList({
  tasks,
  editingTaskID,
  handleToggle,
  handleDelete,
  handleEdit,
  canSave,
  handleSave,
  handleCancel,
}: TaskListProps) {
  return (
    <ul>
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          editingTaskID={editingTaskID}
          handleToggle={handleToggle}
          handleDelete={handleDelete}
          handleEdit={handleEdit}
          canSave={canSave}
          handleSave={handleSave}
          handleCancel={handleCancel}
        />
      ))}
    </ul>
  );
}
