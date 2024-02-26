import { useState, useEffect } from "react";
import Logs from "./Logs";
import LogDetails from "./LogDetails";
import LogForm from "./LogForm";
import LogEdit from "./LogEdit";


const App = () => {
  const [logs, setLogs] = useState([]);
  const [toggleDetails, setToggleDetails] = useState({ show: false, id: null });
  const [toggleForm, setToggleForm] = useState(false)
  const [edit, setEdit] = useState({ show: false, id: null })

  useEffect(() => {
    fetch('http://localhost:3456/logs')
    .then((res) => res.json())
    .then((data) => setLogs(data.logs))
}, [])

  return (
    <div>
      <h1>Logs CRUD</h1>
      { !toggleForm && <button onClick={()=>setToggleForm(true)}>Create Log</button>}
      <Logs 
      logs={logs} 
      setLogs={setLogs}
       setToggleDetails={setToggleDetails} setEdit={setEdit} setToggleForm={setToggleForm}  />

      {toggleDetails.show && <LogDetails toggleDetails={toggleDetails} />}

      {toggleForm && <LogForm setLogs={setLogs} setToggleForm={setToggleForm}/>}

      {edit.show && <LogEdit setLogs={setLogs} setToggleForm={setToggleForm} setEdit={setEdit} edit={edit} />}
      
    </div>
  );
};

export default App;
