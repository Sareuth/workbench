import { useState } from "react";
import { TaskList } from "./TaskList";
import type { Task } from "./types";

function App() {
  const [tasks, setTasks] = useState<Task[]>([
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
  ]);

  const [title, setTitle] = useState<string>("");

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

  return (
    <main>
      <h1>Workbench</h1>
      <TaskList
        tasks={tasks}
        handleToggle={handleToggle}
        handleDelete={handleDelete}
      />
      <div className="add-task">
        <label htmlFor="title">Task Title</label>
        <div className="add-task-controls">
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <button onClick={handleAddTask}>Add Task</button>
        </div>
      </div>
    </main>
  );
}

export default App;
