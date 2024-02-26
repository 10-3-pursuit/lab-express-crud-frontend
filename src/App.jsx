import { useEffect, useState } from "react";
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
      {!toggleForm && 
      <button onClick={() => setToggleForm(true)}>Create a Log</button> }
      <Logs
        logs={logs}
        setLogs={setLogs}
        setToggleDetails={setToggleDetails}
        edit = {edit}
        setEdit = {setEdit}
      />
      {toggleDetails.show && <Log 
        toggleDetails={toggleDetails} 
      />}
      {(edit.show || toggleForm) && <LogForm 
        setLogs = {setLogs} 
        setToggleForm = {setToggleForm}
        edit ={edit}
        setEdit = {setEdit}
      />}
    </div>
  );
};

export default App;
