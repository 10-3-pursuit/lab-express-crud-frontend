// import { useState, useEffect } from 'react';
// import { Routes, Route } from 'react-router-dom'; // used to navigate (not to create and store endpoints like express.Router)
// import Log from './Log';
// import Logs from './Logs';
// import LogForm from './LogForm';
// import "./App.css"
// import Header from './Header';

// function App() {
//   const [logs, setLogs] = useState([]); 
//   const [toggleDetails, setToggleDetails] = useState({ show: false, id: null });
//   const [toggleForm, setToggleForm] = useState(false); // used by LogForm prop and hide/show button in app.jsx so nned to stay here
//   const [edit, setEdit] = useState({ show: false, id: null });

//   useEffect(() => {
//     fetch("http://localhost:3333/logs/")
//       .then((res) => res.json())
//       .then((data) => setLogs(data.logs)); //this contains the array of obj
//   }, []);

//   const isVisible = !(edit.show || toggleForm); 

//     // inputted data is in localstorage so we can retrieve it from local storage to display on page right away instead of waiting to see it displayed in Logs view once page is refreshed
//     useEffect(() => {
//       // JSON.parse() static method parses a JSON string, constructing the JavaScript value or object described by the string.
//       const storedLogs = JSON.parse(localStorage.getItem('logs')) || []; // Storage.getItem(key: string): string | null Returns the current value associated with the given key, or null if the given key does not exist.
//       setLogs(storedLogs);
//     }, []);
  
//     // Save logs to local storage whenever they change
//     useEffect(() => {
//       // JSON.stringify() static method converts a JavaScript value to a JSON string (so localStorage in browser can read it)
//       localStorage.setItem('logs', JSON.stringify(logs)); // Storage.setItem(key: string, value: string): void Sets the value of the pair identified by key to value, creating a new key/value pair if none existed for key previously.
//     }, [logs]);
//   return (
//     <>
//     <Header />
//       <main>
//         <Routes>
//           <Route path="/logs" element={
//             <section>
//               <h1>Recently Viewed Log:</h1>
//               <div className='recently-viewed'>{toggleDetails.show && <Log toggleDetails={toggleDetails} setEdit={setEdit}/>}</div>

//               {/* add functionality that makes add log button disappear when edit log form appears to remove bug */}
//               <div className='log-form-button'>{!toggleForm && <button onClick={() => setToggleForm(true)} style={{ visibility: isVisible ? 'visible' : 'hidden' }}>Add Log</button>}</div>
//               { (edit.show || toggleForm) && <LogForm setLogs={setLogs} setToggleForm={setToggleForm} edit={edit} setEdit={setEdit} /> }
//               {/* don't forget to do edit.show to toggle edit button - in parentheses so the whole statement evaluates to true or false - if edit is true then setEdit if false then we need a clear form! */}

//               <Logs logs={logs} setLogs={setLogs} setToggleDetails={setToggleDetails} edit={edit} setEdit={setEdit} />
//               {/* instead of making a /logs/form path, added logForm prop to /logs instead so it can be on same view like specified in checklist (to be able to toggle on and off hidden state like how it's done for Log prop)*/}
//             </section>
//           }/>
//           <Route path="/logs/:id" element={toggleDetails.show && <Log toggleDetails={toggleDetails} setEdit={setEdit} />}/>
//         </Routes>
//       </main>
//     </>
//   );
// }

// export default App;

import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Log from './Log';
import Logs from './Logs';
import LogForm from './LogForm';
import "./App.css"
import Header from './Header';

function App() {
  const [logs, setLogs] = useState([]); 
  const [toggleDetails, setToggleDetails] = useState({ show: false, id: null });
  const [toggleForm, setToggleForm] = useState(false);
  const [edit, setEdit] = useState({ show: false, id: null });

  useEffect(() => {
    fetch("http://localhost:3333/logs/")
      .then((res) => res.json())
      .then((data) => setLogs(data.logs));
  }, []);

  const isVisible = !(edit.show || toggleForm);

  useEffect(() => {
    const storedLogs = JSON.parse(localStorage.getItem('logs')) || [];
    setLogs(storedLogs);
  }, []);
  
  useEffect(() => {
    localStorage.setItem('logs', JSON.stringify(logs));
  }, [logs]);

  const deleteLog = (id) => {
    const options = {
      method: "DELETE",
    };
    
    fetch(`http://localhost:3333/logs/${id}`, options)
      .then((res) => res.json())
      .then((data) => setLogs(data.logs))
      .catch(error => console.error('Error deleting log:', error));
  };

  const addLog = (newLog) => {
    setLogs([...logs, newLog]);
  };

  return (
    <>
      <Header />
      <main>
        <Routes>
          <Route path="/logs" element={
            <section>
              <h1>Recently Viewed Log:</h1>
              <div className='recently-viewed'>{toggleDetails.show && <Log toggleDetails={toggleDetails} setEdit={setEdit}/>}</div>
              <div className='log-form-button'>{!toggleForm && <button onClick={() => setToggleForm(true)} style={{ visibility: isVisible ? 'visible' : 'hidden' }}>Add Log</button>}</div>
              { (edit.show || toggleForm) && <LogForm setLogs={setLogs} setToggleForm={setToggleForm} edit={edit} setEdit={setEdit} addLog={addLog} /> }
              <Logs logs={logs} setLogs={setLogs} setToggleDetails={setToggleDetails} edit={edit} setEdit={setEdit} deleteLog={deleteLog} />
            </section>
          }/>
          <Route path="/logs/:id" element={toggleDetails.show && <Log toggleDetails={toggleDetails} setEdit={setEdit} />}/>
        </Routes>
      </main>
    </>
  );
}

export default App;
