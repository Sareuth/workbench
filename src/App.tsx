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

  const handleToggle = (id: string) => {
    const newTasks = tasks.map((task) => {
      if (task.id === id) {
        return {
          id: task.id,
          title: task.title,
          completed: !task.completed
        }
      } else {
        return task;
      }
    });

    setTasks (newTasks);
  };

  return (
    <main>
      <h1>Workbench</h1>
      <TaskList tasks={tasks} handleToggle={handleToggle}/>
    </main>
  );
}

export default App;
