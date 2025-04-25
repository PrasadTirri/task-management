import { useMemo } from "react";
import "../App.css";
import TaskColumn from "./TaskColumn";

const STATUSES = ["To Do", "In Progress", "Done"];

function TaskBoard({ tasks, moveTask }) {
  const tasksByStatus = useMemo(() => {
    return STATUSES.reduce((acc, status) => {
      acc[status] = tasks.filter((task) => task.status === status);
      return acc;
    }, {});
  }, [tasks]);

  return (
    <div className="task-board">
      {STATUSES.map((status) => (
        <TaskColumn
          key={status}
          status={status}
          tasks={tasksByStatus[status] || []}
          moveTask={moveTask}
        />
      ))}
    </div>
  );
}

export default TaskBoard;
