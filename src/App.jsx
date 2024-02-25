import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Log from './Log';
import Logs from './Logs';

function App() {
  const [logs, setLogs] = useState([]); 
  const [toggleDetails, setToggleDetails] = useState({ show: false, id: null });

  return (
    <div>
      <header>
        <h1>Log Details</h1>
      </header>
      <main>
        <Routes>
          <Route path="/logs" element={<Logs logs={logs} setLogs={setLogs} setToggleDetails={setToggleDetails} />}/>
          <Route path="/logs/:id" element={toggleDetails.show && <Log toggleDetails={toggleDetails}/>}/>
        </Routes>
        {/* Instead of using Routes, use the next lines to show the selected item on same page */}
        {/* <Logs logs={logs} setLogs={setLogs} setToggleDetails={setToggleDetails} />
        {toggleDetails.show && <Log toggleDetails={toggleDetails}/>} */}
      </main>
    </div>
  );
}

export default App;
