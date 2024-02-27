import React from "react";
import Log from "../Log";
import { Link, useNavigate } from "react-router-dom";

const Logs = ({ logs, setToggleDetails, toggleDetails }) => {
  function handleDelete(id) {
    const options = {
      method: "DELETE",
    };
    fetch(`http://localhost:3333/api/logs/${id}`, options)
      .then((res) => res.json())
      .then((data) => data.logs);
    setToggleDetails({ show: false, id: id });
  }

  const navigate = useNavigate();

  // function handleEdit() {
  //   navigate("/logs/new");
  // }

  return (
    <div className="container">
      <Link to={"/logs/new"}>
        <button className="mb-3 p-2">Create a Log!</button>
      </Link>
      <div className="border border-black text-center">
        <h1>Logs</h1>
        {logs.length > 0 &&
          logs.map((log) => (
            <div key={log.id} className="border border-black">
              <p>Log# {log.id}</p>
              <p> - Captain {log.captainName}</p>
              <button
                onClick={() =>
                  setToggleDetails({ show: !toggleDetails.show, id: log.id })
                }
                className="p-2 mb-3 mx-2"
              >
                {toggleDetails.show && toggleDetails.id === log.id
                  ? "Hide Details"
                  : "View Details"}
              </button>
              <Link to={`/logs/edit/${log.id}`}>
                <button className="p-2 mb-3 mx-2">Edit</button>
              </Link>
              <button
                onClick={() => handleDelete(log.id)}
                className="p-2 mb-3 mx-2"
              >
                Delete
              </button>
              {toggleDetails.show && toggleDetails.id === log.id && (
                <Log log={log} />
              )}
            </div>
          ))}
      </div>
    </div>
  );
};

export default Logs;
