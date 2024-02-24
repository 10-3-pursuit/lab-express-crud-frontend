import { useEffect } from 'react';

function Logs({ logs, setLogs, setToggleDetails }) {
  useEffect(() => {
    fetch("http://localhost:8888/api/logs")
      .then((res) => res.json())
      .then((data) => setLogs(data.logs));
  }, []);

  if (logs.length === 0) return null;

  return (
    <div>
      <h1>Logs array</h1>
      {logs.map(({ id, captainName, title, post, mistakesWereMadeToday, daysSinceLastCrisis }) => (
        <div key={id}>
          <h1>{captainName}</h1>
          <h3>{title}</h3>
          <p>{post}</p>
          <p>Mistakes were made today: {mistakesWereMadeToday ? "true" : "false"}</p>
          <p>{daysSinceLastCrisis}</p>
          <button onClick={() => setToggleDetails({ show: true, id:id })}>
            Details
          </button>
          <hr />
        </div>
      ))}
    </div>
  );
}

export default Logs;
