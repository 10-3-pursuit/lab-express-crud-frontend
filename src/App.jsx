import { useState, useEffect } from "react";
import { Route, Routes, Link } from "react-router-dom"
import Logs from "./Logs";
import LogDetails from "./LogDetails";
import LogForm from "./LogForm";
import LogEdit from "./LogEdit";


const App = () => {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3456/logs')
    .then((res) => res.json())
    .then((data) => setLogs(data.logs))
}, [])

  return (
    <div>
      <h1>Logs CRUD</h1>
      <Link to="/new">
          <button>Create Log</button>
      </Link>

      <Routes>
        <Route path="/" element={
          <Logs 
          logs={logs} 
          setLogs={setLogs} />
        }/>

        <Route path="/:id" element={
          <LogDetails />
        }/>

        <Route path="/edit/:id" element={
          <LogEdit setLogs={setLogs} />
        }/>
        

        <Route path="/new" element={
          <LogForm setLogs={setLogs}/>
        }/>

      </Routes> 
    </div>
  );
};

export default App;
