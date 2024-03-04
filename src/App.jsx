import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom'; // used to navigate (not to create and store endpoints like express.Router)
import Log from './Log';
import Logs from './Logs';
import LogForm from './LogForm';
import "./App.css"
import Header from './Header';

function App() {
  const [logs, setLogs] = useState([]); 
  const [toggleDetails, setToggleDetails] = useState({ show: false, id: null });
  const [toggleForm, setToggleForm] = useState(false); // used by LogForm prop and hide/show button in app.jsx so nned to stay here
  const [edit, setEdit] = useState({ show: false, id: null });

  useEffect(() => {
    fetch("http://localhost:3333/logs/")
      .then((res) => res.json())
      .then((data) => setLogs(data.logs)); //this contains the array of obj
  }, []);

  const isVisible = !(edit.show || toggleForm); 
  return (
    <>
    <Header />
      <main>
        <Routes>
          <Route path="/logs" element={
            <section>
              <h1>Recently Viewed Log:</h1>
              <div className='recently-viewed'>{toggleDetails.show && <Log toggleDetails={toggleDetails} setEdit={setEdit}/>}</div>

              {/* add functionality that makes add log button disappear when edit log form appears to remove bug */}
              <div className='log-form-button'>{!toggleForm && <button onClick={() => setToggleForm(true)} style={{ visibility: isVisible ? 'visible' : 'hidden' }}>Add Log</button>}</div>
              { (edit.show || toggleForm) && <LogForm setLogs={setLogs} setToggleForm={setToggleForm} edit={edit} setEdit={setEdit} /> }
              {/* don't forget to do edit.show to toggle edit button - in parentheses so the whole statement evaluates to true or false - if edit is true then setEdit if false then we need a clear form! */}

              <Logs logs={logs} setLogs={setLogs} setToggleDetails={setToggleDetails} edit={edit} setEdit={setEdit} />
              {/* instead of making a /logs/form path, added logForm prop to /logs instead so it can be on same view like specified in checklist (to be able to toggle on and off hidden state like how it's done for Log prop)*/}
            </section>
          }/>
          <Route path="/logs/:id" element={toggleDetails.show && <Log toggleDetails={toggleDetails} setEdit={setEdit} />}/>
        </Routes>
      </main>
    </>
  );
}

export default App;