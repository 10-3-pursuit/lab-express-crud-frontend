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
          <Route path="/logs/:id" element={<Log toggleDetails={toggleDetails} setEdit={setEdit} />}/>
        </Routes>
      </main>
    </>
  );
}

export default App;
