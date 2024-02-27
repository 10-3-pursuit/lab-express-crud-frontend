import React, { useEffect, useState } from "react";
import Logs from "./Logs";
import Log from "../Log";
import { Link, Route, Routes, useNavigate } from "react-router-dom";
import LogForm from "./LogForm";

const App = () => {
  const [logs, setLogs] = useState([]);
  const [toggleDetails, setToggleDetails] = useState({ show: false, id: null });

  useEffect(() => {
    fetch(`http://localhost:3333/api/logs`)
      .then((res) => res.json())
      .then((data) => setLogs(data.logs));
  }, [logs]);

  const navigate = useNavigate();

  return (
    <div>
      <button onClick={() => navigate("/logs")} className="btn btn-light">
        <h1>Welcome to the Captain's Log</h1>
      </button>
      <Routes>
        <Route
          path="/logs"
          element={
            <Logs
              logs={logs}
              setToggleDetails={setToggleDetails}
              toggleDetails={toggleDetails}
            />
          }
        ></Route>
        <Route
          path="/logs/new"
          element={<LogForm logs={logs} setLogs={setLogs} />}
        ></Route>
        <Route
          path="/logs/edit/:id"
          element={<LogForm logs={logs} setLogs={setLogs} />}
        />
      </Routes>
    </div>
  );
};

export default App;
