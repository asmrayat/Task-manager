import { useEffect, useState } from "react";
import CreateTask from "./Components/CreateTask";
import ListTask from "./Components/ListTask";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import Main from "./Layout/Main";

function App() {

  return (
    <div>
      <Main></Main>
    </div>
  );
}

export default App;
