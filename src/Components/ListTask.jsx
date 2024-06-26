import { useEffect, useState } from "react";
import { useDrag, useDrop } from "react-dnd";
import { MdDelete } from "react-icons/md";

const ListTask = ({ tasks, setTasks }) => {
  // console.log(tasks);
  const [todos, setTodos] = useState([]);
  const [onGoing, setOnGoing] = useState([]);
  const [completed, setCompleted] = useState([]);

  useEffect(() => {
    const fTodos = tasks.filter((task) => task.status === "todo");
    const fOnGoing = tasks.filter((task) => task.status === "ongoing");
    const fcompleted = tasks.filter((task) => task.status === "completed");

    setTodos(fTodos);
    setOnGoing(fOnGoing);
    setCompleted(fcompleted);
  }, [tasks]);
  const statuses = ["todo", "ongoing", "completed"];

  return (
    <div className="flex gap-16">
      {statuses.map((status, index) => (
        <Section
          key={index}
          status={status}
          tasks={tasks}
          setTasks={setTasks}
          todos={todos}
          onGoing={onGoing}
          completed={completed}
        />
      ))}
    </div>
  );
};

export default ListTask;

const Section = ({ status, tasks, setTasks, todos, onGoing, completed }) => {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: "task",
    drop: (item) => addItemToSection(item.id),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  let text = "todo";
  let bg = "bg-slate-500";
  let tasksToMap = todos;

  if (status === "ongoing") {
    text = "In Progress";
    bg = "bg-purple-500";
    tasksToMap = onGoing;
  }
  if (status === "completed") {
    text = "Closed";
    bg = "bg-green-500";
    tasksToMap = completed;
  }

  const addItemToSection = (id) => {
    setTasks((prev) => {
      const mTasks = prev.map((t) => {
        console.log(id);
        if (t._id === id) {
          console.log(status);
          return { ...t, status: status };
        }
        return t;
      });

      console.log(mTasks);
      fetch(`https://task-manager-backend-8vlr.onrender.com/task/${id}`, {
        method: "PATCH",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ status }),
      }).then((res) => res.json());
      return mTasks;
    });
  };

  return (
    <div
      ref={drop}
      className={`w-64 ${isOver ? "bg-slate-200" : ""} rounded-md p-2`}
    >
      <Header text={text} bg={bg} count={tasksToMap.length} />
      {tasksToMap.length > 0 &&
        tasksToMap.map((task) => (
          <Task key={task._id} tasks={tasks} task={task} setTasks={setTasks} />
        ))}
    </div>
  );
};

const Header = ({ text, bg, count }) => {
  return (
    <div
      className={`${bg} flex items-center h-12 pl-4 rounded-md uppercase text-sm text-white`}
    >
      {text} <div className="ml-2"> {count}</div>
    </div>
  );
};

const Task = ({ task, tasks, setTasks }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "task",
    item: { id: task._id },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  const handleRemove = (id) => {
    console.log(id);
    fetch(`https://task-manager-backend-8vlr.onrender.com/task/${id}`, {
      method: "DELETE",
    }).then((res) => res.json());
    const fTasks = tasks.filter((t) => t._id !== id);
    setTasks(fTasks);
  };
  return (
    <div
      ref={drag}
      className={`relative p-2 cursor-grab ${
        isDragging ? "opacity-25" : "opacity-100"
      }`}
    >
      <div className="collapse bg-base-200">
        <input type="radio" name="my-accordion-1" />
        <div className="collapse-title font-medium">{task.title}</div>
        <div className="collapse-content">
          <p className="text-xs">{task.description}</p>
          <div className="badge badge-accent me-2 mt-3">{task.deadline}</div>
          <div
            className={`badge ${
              task.Priority === "high" ? "badge-primary" : "badge-secondary"
            }`}
          >
            {task.Priority}
          </div>
        </div>
        <button
          className=" text-2xl absolute bottom-4 right-3"
          onClick={() => handleRemove(task._id)}
        >
          <MdDelete />
        </button>
      </div>
    </div>
  );
};
