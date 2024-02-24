import { useState } from "react";
import Logs from "./Logs";
import LogDetails from "./LogDetails";


const App = () => {
  const [logs, setLogs] = useState([]);
  const [toggleDetails, setToggleDetails] = useState({ show: false, id: null });

  return (
    <div>
      <h1>Logs CRUD</h1>
      <Logs 
      logs={logs} 
      setLogs={setLogs}
       setToggleDetails={setToggleDetails}/>

      {toggleDetails.show && <LogDetails toggleDetails={toggleDetails} />}
      
    </div>
  );
};

export default App;
