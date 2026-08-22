import { useState } from "react";
import { TaskList } from "./TaskList";
import type { Task } from "./types";

function App() {
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: "1",
      title: "Create Workbench repository",
      completed: true,
    },
    {
      id: "2",
      title: "Render first React components",
      completed: false,
    },
    {
      id: "3",
      title: "Add testing",
      completed: false,
    },
  ]);

  const [title, setTitle] = useState<string>("");

  const handleToggle = (id: string) => {
    const newTasks = tasks.map((task) => {
      if (task.id === id) {
        return {
          id: task.id,
          title: task.title,
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
        id: String(1 + tasks.length),
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
      <TaskList tasks={tasks} handleToggle={handleToggle} handleDelete={handleDelete} />
      <input
        id="title"
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <label htmlFor="title">Task Title</label>
      <button onClick={handleAddTask}>Add Task</button>
    </main>
  );
}

export default App;
