import { useEffect } from "react";

const Logs = ({ logs, setLogs, toggleLogs, setToggleLogs, setEdit }) => {
  useEffect(() => {
    fetch(`http://localhost:3333/logs`)
      .then((res) => res.json())
      .then((data) => setLogs(data.logs));
  }, []);

  if (logs.length === 0) return null;

  function handleDelete(id) {
    console.log(id);
    const options = {
      method: "DELETE",
    };
    fetch(`http://localhost:3333/logs/${id}`, options)
      .then((res) => res.json())
      .then((data) => setLogs(data.logs));
  }

  return (
    <div>
      {logs.map(({ id, captainName, title }) => (
        <div key={id}>
          <h3>Captain Name: {captainName}</h3>
          <p>Title: {title}</p>
          <button onClick={() => setToggleLogs({ show: true, id: id })}>
            Details
          </button>
          <button onClick={() => setEdit({ show: true, id: id })}>Edit</button>
          <button onClick={() => handleDelete(id)}>Delete</button>
          <hr />
        </div>
      ))}
    </div>
  );
};

export default Logs;
