import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Log from './Log';
import Logs from './Logs';
import LogForm from './LogForm';

function App() {
  const [logs, setLogs] = useState([]); 
  const [toggleDetails, setToggleDetails] = useState({ show: false, id: null });

  return (
      <main>
        <Routes>
          <Route path="/logs" element={<Logs logs={logs} setLogs={setLogs} setToggleDetails={setToggleDetails} />}/>
          <Route path="/logs/:id" element={toggleDetails.show && <Log toggleDetails={toggleDetails}/>}/>
          {/* maybe add route for form (logs/form) so it can be on different page instead of being on Logs view */}
          <Route path="/logs/form" element={<LogForm setLogs={setLogs}/>}/>
        </Routes>
        {/* Instead of using Routes, use the next lines to show the selected item on same page */}
        {/* <Logs logs={logs} setLogs={setLogs} setToggleDetails={setToggleDetails} />
        {toggleDetails.show && <Log toggleDetails={toggleDetails}/>} */}
      </main>
  );
}

export default App;
