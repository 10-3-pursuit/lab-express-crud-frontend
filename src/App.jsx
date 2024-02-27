import { useEffect, useState } from "react";
import { Routes, Route, Link } from "react-router-dom";

//components
import Logs from "./Logs";
import Log from "./Log";
import LogForm from "./LogForm";

const App = () => {
  const [logs, setLogs] = useState([]);
  const [toggleDetails, setToggleDetails] = useState({ show: false, id: null });
  const [toggleForm ,setToggleForm] = useState(false);
  const [edit, setEdit] = useState({ show: false, id:null })

  useEffect(() => {
    fetch("http://localhost:8888/api/logs")
      .then((res) => res.json())
      .then((data) => setLogs(data.logs));
  }, []);

  return (
    <div>
      <h1>Logs CRUD</h1>
      <Link to ="/new">
       <button >Create a bookmark</button> 
      </Link>

      <Routes>
        {/* show all logs component */}
        <Route 
          path="/"
          element= {
            <Logs
              logs={logs}
              setLogs={setLogs}
              setToggleDetails={setToggleDetails}
              edit = {edit}
              setEdit = {setEdit}
            />
          }
        />
        {/* details route */}
        <Route 
          path="/:id" 
          element={<Log toggleDetails={toggleDetails} />}
        />
        {/* edit route */}
        <Route 
          path="/edit/:id" 
          element = {
            <LogForm 
              setLogs = {setLogs} 
              setToggleForm = {setToggleForm}
              edit ={edit}
              setEdit = {setEdit}
            />
          }
        />
        {/* create new bookmark */}
        <Route 
          path="/new"           
          element = {
            <LogForm 
            setLogs = {setLogs} 
            setToggleForm = {setToggleForm}
            edit ={edit}
            setEdit = {setEdit}
            />
          } 
        />
      </Routes>
    </div>
  );
};

export default App;
