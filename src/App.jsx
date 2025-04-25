import { useState, useEffect } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import TaskBoard from "./components/TaskBoard";
import AddTaskModal from "./components/AddTaskModal";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/todos?_limit=10"
      );
      if (!response.ok) throw new Error("Failed to fetch tasks");
      let data = await response.json();

      data = data.map((item) => ({
        id: item.id,
        title: item.title,
        description: `Task description for ${item.title}`,
        status: item.completed
          ? "Done"
          : Math.random() > 0.5
          ? "In Progress"
          : "To Do",
      }));

      setTasks(data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const addTask = async (newTask) => {
    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/todos",
        {
          method: "POST",
          body: JSON.stringify({
            title: newTask.title,
            description: newTask.description,
            status: newTask.status,
            userId: 1,
          }),
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        }
      );

      if (!response.ok) throw new Error("Failed to add task");

      const uniqueId = Date.now() + Math.floor(Math.random() * 1000);

      const createdTask = {
        id: uniqueId,
        title: newTask.title,
        description: newTask.description,
        status: newTask.status,
      };

      setTasks((prevTasks) => [...prevTasks, createdTask]);
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  const moveTask = async (id, newStatus) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, status: newStatus } : task
    );
    setTasks(updatedTasks);

    try {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/todos/${id}`,
        {
          method: "PATCH",
          body: JSON.stringify({
            status: newStatus,
          }),
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        }
      );

      if (!response.ok) throw new Error("Failed to update task");
    } catch (error) {
      console.error("Error updating task:", error);
      setTasks(tasks);
    }
  };

  return (
    <div className="app">
      <p>Prasad Tirri</p>
      <header className="app-header">
        <h1>Task Management App</h1>
        <button
          className="add-task-button"
          onClick={() => setIsModalOpen(true)}
        >
          Add New Task
        </button>
      </header>

      <DndProvider backend={HTML5Backend}>
        {isLoading ? (
          <div className="loading">Loading tasks...</div>
        ) : (
          <TaskBoard tasks={tasks} moveTask={moveTask} />
        )}
      </DndProvider>

      {isModalOpen && (
        <AddTaskModal
          onAddTask={addTask}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
}

export default App;
