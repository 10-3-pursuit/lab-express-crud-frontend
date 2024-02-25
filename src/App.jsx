import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Log from './Log';
import Logs from './Logs';
import LogForm from './LogForm';

function App() {
  const [logs, setLogs] = useState([]); 
  const [toggleDetails, setToggleDetails] = useState({ show: false, id: null });
  const [toggleForm, setToggleForm] = useState(false); // moved form view to this component
  return (
      <main>
        <Routes>
          <Route path="/logs" element={
            <>
              <Logs logs={logs} setLogs={setLogs} setToggleDetails={setToggleDetails} />
              {!toggleForm && <button onClick={() => setToggleForm(true)}>Add Log</button>}
              {toggleForm && <LogForm setLogs={setLogs} setToggleForm={setToggleForm}/>}
              {!toggleDetails.show && <Log toggleDetails={toggleDetails}/>} 
              {/* instead of making a /logs/form path, added logForm prop to /logs instead so it can be on same view like specified in checklist (to be able to toggle on and off hidden state like how it's done for Log prop)*/}
            </>
            }/>
          {/* display form output here */}
        </Routes>
      </main>
  );
}

export default App;