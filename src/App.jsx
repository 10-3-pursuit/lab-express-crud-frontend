import { useState } from 'react';
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
        {/* <Routes>
          <Route path="/logs"/>
          <Route path="/logs/:id" element={toggleDetails.show && <Log toggleDetails={toggleDetails}/>}/>
        </Routes> */}
        <Logs logs={logs} setLogs={setLogs} setToggleDetails={setToggleDetails} />
        {toggleDetails.show && <Log toggleDetails={toggleDetails}/>}
      </main>
    </div>
  );
}

export default App;
