import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Log from './Log';
import Logs from './Logs';
import LogForm from './LogForm';

function App() {
  const [logs, setLogs] = useState([]); 
  const [toggleDetails, setToggleDetails] = useState({ show: false, id: null });
  const [toggleForm, setToggleForm] = useState(false); // used by LogForm prop and hide/show button in app.jsx so nned to stay here

  // inputted data is in localstorage so we can retrieve it from local storage to display on page right away instead of waiting to see it displayed in Logs view once page is refreshed
  useEffect(() => {
    // JSON.parse() static method parses a JSON string, constructing the JavaScript value or object described by the string.
    const storedLogs = JSON.parse(localStorage.getItem('logs')) || []; // Storage.getItem(key: string): string | null Returns the current value associated with the given key, or null if the given key does not exist.
    setLogs(storedLogs);
  }, []);

  // Save logs to local storage whenever they change
  useEffect(() => {
    // JSON.stringify() static method converts a JavaScript value to a JSON string (so localStorage in browser can read it)
    localStorage.setItem('logs', JSON.stringify(logs)); // Storage.setItem(key: string, value: string): void Sets the value of the pair identified by key to value, creating a new key/value pair if none existed for key previously.
  }, [logs]);

  return (
      <main>
        <Routes>
          <Route path="/logs" element={
            <>
              <Logs logs={logs} setLogs={setLogs} setToggleDetails={setToggleDetails} />
              {!toggleForm && <button onClick={() => setToggleForm(true)}>Add Log</button>}
              {toggleForm && <LogForm setLogs={setLogs} setToggleForm={setToggleForm}/>}
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