import { useEffect } from "react";

const Logs = ({ logs, setLogs, setToggleDetails }) => {
  useEffect(() => {
    fetch("http://localhost:3333/logs/")
      .then((res) => res.json())
      .then((data) => setLogs(data.logs));
  }, []);

  if (logs.length === 0) return null

  return (
    <div>
      <h1>Logs</h1>
      {logs.map(({ id, captainName, title, post }) => (
        <div key={id}>
          <h3>{title} - {captainName}</h3>
          <p>{post}</p>
          <button onClick={() => setToggleDetails({ show: true, id })}>
            Details
          </button>
          <hr />
        </div>
      ))}
    </div>
  );
};

export default Logs;
