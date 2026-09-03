import { useState, useEffect } from "react";
import { TaskList } from "./TaskList";
import type { Task } from "./types";

function App() {
  const [tasks, setTasks] = useState<Task[]>(() => {
    const saved = localStorage.getItem("workbench.tasks");

    if (saved) {
      return JSON.parse(saved);
    }

    return [
      {
        id: crypto.randomUUID(),
        title: "Create Workbench repository",
        completed: true,
      },
      {
        id: crypto.randomUUID(),
        title: "Render first React components",
        completed: false,
      },
      {
        id: crypto.randomUUID(),
        title: "Add testing",
        completed: false,
      },
    ];
  });

  useEffect(() => {
    localStorage.setItem("workbench.tasks", JSON.stringify(tasks));
  }, [tasks]);

  const [filter, setFilter] = useState<"All" | "Open" | "Completed">("All");
  const visibleTasks = tasks.filter((task) => {
    switch (filter) {
      case "Open":
        return !task.completed;
      case "Completed":
        return task.completed;
      default:
        return true;
    }
  });

  const [title, setTitle] = useState<string>("");
  const [editingTaskID, setEditingTaskID] = useState<string | null>(null);

  const isEditingTask = editingTaskID !== null;

  const handleToggle = (id: string) => {
    const newTasks = tasks.map((task) => {
      if (task.id === id) {
        return {
          ...task,
          completed: !task.completed,
        };
      } else {
        return task;
      }
    });

    setTasks(newTasks);
  };

  const handleDelete = (id: string) => {
    const newTasks = tasks.filter((task) => task.id !== id);

    setTasks(newTasks);
  };

  const handleAddTask = () => {
    if (title.trim().length > 0) {
      const newTask: Task = {
        id: crypto.randomUUID(),
        title: title.trim(),
        completed: false,
      };
      setTasks([...tasks, newTask]);
      setTitle("");
    }
  };

  const handleEdit = (id: string) => {
    setEditingTaskID(id);
  };

  const canSave = (title: string) => {
    return !tasks.some((task) => {
      if (task.id === editingTaskID) return false;
      return task.title.toLowerCase().trim() === title.toLowerCase().trim();
    });
  };

  const handleSave = (title: string) => {
    const newTasks = tasks.map((task) => {
      if (task.id === editingTaskID) {
        return { ...task, title: title.trim() };
      } else {
        return task;
      }
    });
    setTasks(newTasks);
    setEditingTaskID(null);
  };

  const handleCancel = () => {
    setEditingTaskID(null);
  };

  return (
    <main>
      <h1>Workbench</h1>
      <div className="task-filters">
        <button
          onClick={() => setFilter("All")}
          aria-pressed={filter === "All"}
        >
          All
        </button>
        <button
          onClick={() => setFilter("Open")}
          aria-pressed={filter === "Open"}
        >
          Open
        </button>
        <button
          onClick={() => setFilter("Completed")}
          aria-pressed={filter === "Completed"}
        >
          Completed
        </button>
      </div>
      <TaskList
        tasks={visibleTasks}
        editingTaskID={editingTaskID}
        handleToggle={handleToggle}
        handleDelete={handleDelete}
        handleEdit={handleEdit}
        canSave={canSave}
        handleSave={handleSave}
        handleCancel={handleCancel}
      />
      <div className="add-task">
        <label htmlFor="title">Task Title</label>
        <div className="add-task-controls">
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            disabled={isEditingTask}
          />
          <button disabled={isEditingTask} onClick={handleAddTask}>
            Add Task
          </button>
        </div>
      </div>
    </main>
  );
}

export default App;
