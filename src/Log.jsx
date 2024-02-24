import { useEffect, useState } from "react";

function Log({ toggleDetails }) {
  const [log, setLog] = useState();

  useEffect(() => {
    fetch(`http://localhost:8888/api/logs/${toggleDetails.id}`)
      .then((res) => res.json())
      .then((data) => setLog(data.log));
  }, [toggleDetails.id]);

  if (!log) return null;
  return (
    <div>
      <h1>{log.captainName}</h1>
      <h3>{log.title}</h3>
      <p>{log.post}</p>
      {console.log(log)}
      <p>Mistakes were made today: {log.mistakesWereMadeToday ? "true" : "false"}</p>
      <p>{log.daysSinceLastCrisis}</p>
    </div>
  );
}

export default Log;
