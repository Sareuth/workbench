import { TaskList } from "./TaskList";
import type { Task } from "./types";

const tasks: Task[] = [
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
];

function App() {
  return (
    <main>
      <h1>Workbench</h1>
      <TaskList tasks={tasks} />
    </main>
  );
}

export default App;
