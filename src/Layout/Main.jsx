import React, { useEffect, useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import CreateTask from "../Components/CreateTask";
import ListTask from "../Components/ListTask";

const Main = () => {
  const [tasks, setTasks] = useState([]);
  const [ack, setAck] = useState(false);

  useEffect(() => {
    setAck(false);
    const data = async () => {
      try {
        const response = await fetch(
          "https://task-manager-backend-8vlr.onrender.com/task",
          {
            method: "GET",
            headers: {
              "Content-type": "application/json",
            },
          }
        );
        const data = await response.json();
        setTasks(data);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };
    data();
  }, [ack]);

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="bg-slate-100 w-screen h-screen flex flex-col items-center pt-3 gap-16">
        <CreateTask tasks={tasks} setAck={setAck} setTasks={setTasks} />
        <ListTask tasks={tasks} setTasks={setTasks} />
      </div>
    </DndProvider>
  );
};

export default Main;
