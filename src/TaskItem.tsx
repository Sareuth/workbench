import { useState } from "react";

import type { Task } from "./types";

interface TaskItemProps {
  task: Task;
  editingTaskID: string | null;
  handleToggle: (id: string) => void;
  handleDelete: (id: string) => void;
  handleEdit: (id: string) => void;
  canSave: (title: string) => boolean;
  handleSave: (title: string) => void;
  handleCancel: () => void;
}

export function TaskItem({
  task,
  editingTaskID,
  handleToggle,
  handleDelete,
  handleEdit,
  canSave,
  handleSave,
  handleCancel,
}: TaskItemProps) {
  const [editTitle, setEditTitle] = useState(task.title);
  const checkboxId = `task-${task.id}`;
  const isEditing = task.id === editingTaskID;
  const isDisabled = editingTaskID !== null && task.id !== editingTaskID;
  const isSavable = canSave(editTitle) && editTitle.trim().length > 0;

  if (isEditing) {
    return (
      <li>
        <input
          id={checkboxId}
          type="checkbox"
          checked={task.completed}
          disabled
        />
        <input
          type="text"
          aria-label={task.title}
          value={editTitle}
          onChange={(e) => setEditTitle(e.target.value)}
        />
        <button onClick={() => handleSave(editTitle)} disabled={!isSavable}>
          Save
        </button>
        <button onClick={handleCancel}>Cancel</button>
      </li>
    );
  } else {
    return (
      <li>
        <input
          id={checkboxId}
          type="checkbox"
          checked={task.completed}
          onChange={() => handleToggle(task.id)}
          disabled={isDisabled}
        />
        <label htmlFor={checkboxId}>{task.title}</label>
        <button
          aria-label={`edit ${task.title}`}
          onClick={() => handleEdit(task.id)}
          disabled={isDisabled}
        >
          Edit
        </button>
        <button
          aria-label={`delete ${task.title}`}
          onClick={() => handleDelete(task.id)}
          disabled={isDisabled}
        >
          Delete
        </button>
      </li>
    );
  }
}
