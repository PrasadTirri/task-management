import TaskCard from "./TaskCard";
import { useDrop } from "react-dnd";
import "../App.css";

function TaskColumn({ status, tasks, moveTask }) {
  const [{ isOver }, drop] = useDrop({
    accept: "task",
    drop: (item) => {
      if (item.status !== status) {
        moveTask(item.id, status);
      }
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  });

  return (
    <div ref={drop} className={`task-column ${isOver ? "drop-target" : ""}`}>
      <h2 className="column-header">{status}</h2>
      <div className="task-list">
        {tasks.length === 0 ? (
          <div className="no-tasks">No tasks</div>
        ) : (
          tasks.map((task) => (
            <TaskCard key={task.id} task={task} moveTask={moveTask} />
          ))
        )}
      </div>
    </div>
  );
}

export default TaskColumn;
