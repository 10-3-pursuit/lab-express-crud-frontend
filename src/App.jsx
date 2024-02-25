import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Log from './Log';
import Logs from './Logs';
import LogForm from './LogForm';

function App() {
  const [logs, setLogs] = useState([]); 
  const [toggleDetails, setToggleDetails] = useState({ show: false, id: null });
  const [toggleForm, setToggleForm] = useState(false); // useState needs to be in app.jsx and not logForm.jsx because of routing (so logForm prop needs to be here and not in Logs.jsx)

  return (
      <main>
        <Routes>
          <Route path="/logs" element={
            <>
              <Logs logs={logs} setLogs={setLogs} setToggleDetails={setToggleDetails} />
              {!toggleForm && <LogForm setLogs={setLogs} setToggleForm={setToggleForm}/>}
              {toggleDetails.show && <Log toggleDetails={toggleDetails}/>} 
              {/* instead of making a /logs/form path, added logForm prop to /logs instead so it can be on same view like specified in checklist (to be able to toggle on and off hidden state like how it's done for Log prop)*/}
            </>
            }/>
          <Route path="/logs/:id" element={toggleDetails.show && <Log toggleDetails={toggleDetails}/>}/>
        </Routes>
      </main>
  );
}

export default App;