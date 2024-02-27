import { useState, useEffect } from "react";
import { Route, Routes, Link } from "react-router-dom"
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
    fetch('http://localhost:3456/api/logs')
    .then((res) => res.json())
    .then((data) => setLogs(data.logs))
}, [])

  return (
    <div>
      <h1>Logs CRUD</h1>
      <Link to="/new">
          <button>Create Bookmark</button>
      </Link>

      {toggleDetails.show && <LogDetails toggleDetails={toggleDetails} />}

      {toggleForm && <LogForm setLogs={setLogs} setToggleForm={setToggleForm}/>}

      {edit.show && <LogEdit setLogs={setLogs} setToggleForm={setToggleForm} setEdit={setEdit} edit={edit} />}

      <Routes>
        <Route path="/" element={
          <Logs 
          logs={logs} 
          setLogs={setLogs} />
        }/>

        <Route path="/new" element={
          <LogForm setLogs={setLogs}/>
        }/>

      </Routes> 
    </div>
  );
};

export default App;
