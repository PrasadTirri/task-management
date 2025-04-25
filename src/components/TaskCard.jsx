import { useDrag } from "react-dnd";
import "../App.css";

function TaskCard({ task }) {
  const [{ isDragging }, drag] = useDrag({
    type: "task",
    item: () => ({
      id: task.id,
      status: task.status,
    }),
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  return (
    <div ref={drag} className={`task-card ${isDragging ? "dragging" : ""}`}>
      <h3 className="task-title">{task.title}</h3>
      {task.description && (
        <p className="task-description">{task.description}</p>
      )}
    </div>
  );
}

export default TaskCard;
