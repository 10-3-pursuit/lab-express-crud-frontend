import { useEffect, useState } from "react";
import { Routes, Route, Link } from "react-router-dom";

//components
import Logs from "./Logs";
import Log from "./Log";
import LogForm from "./LogForm";

const App = () => {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8888/api/logs")
      .then((res) => res.json())
      .then((data) => setLogs(data.logs));
  }, []);

  return (
    <div>
      <h1>Logs CRUD</h1>
      <Link to ="/new">
       <button >Create a log</button> 
      </Link>

      <Routes>
        {/* show all logs component */}
        <Route 
          path="/"
          element= {
            <Logs
              logs={logs}
              setLogs={setLogs}
            />
          }
        />
        {/* details route */}
        <Route 
          path="/:id" 
          element = {<Log />}
        />
        {/* edit route */}
        <Route 
          path="/edit/:id" 
          element = {
            <LogForm 
              setLogs = {setLogs} 
            />
          }
        />
        {/* create new logs */}
        <Route 
          path="/new"           
          element = {
            <LogForm 
            setLogs = {setLogs} 
            />
          } 
        />
      </Routes>
    </div>
  );
};

export default App;
