import React from "react";
import Logs from "./Logs";
import { Route, Routes } from "react-router-dom";
import { useState } from "react";
import SingleLogDetails from "./SingleLogDetails";
import LogsForm from "./LogsForm";
import LogEdit from "./LogEdit";

const App = () => {
  //this state will return all logs
  const [logs, setLogs] = useState([]);
  //this state will toggle the Logs component and send the id
  const [toggleLogs, setToggleLogs] = useState({ show: false, id: null });
  const [toggleLogForm, setToggleLogForm] = useState(false);
  // state to render a single Log
  const [edit, setEdit] = useState({ show: false, id: null });

  return (
    <div>
      <h1>Logs CRUD</h1>
      {!toggleLogForm && (
        <button onClick={() => setToggleLogForm(true)}>Create Log</button>
      )}
      <Logs
        logs={logs}
        setLogs={setLogs}
        toggleLogs={toggleLogs}
        setToggleLogs={setToggleLogs}
        setEdit={setEdit}
      />
      <SingleLogDetails toggleLogs={toggleLogs} />
      {toggleLogForm && (
        <LogsForm setLogs={setLogs} setToggleLogForm={setToggleLogForm} />
      )}
      <LogEdit
        edit={edit}
        setEdit={setEdit}
        setToggleLogForm={setToggleLogForm}
        setLogs={setLogs}
      />
    </div>
  );
};

export default App;
