import { useState, useEffect } from 'react';

function Log({ toggleSingleLog }) {
  const [log, setLog] = useState();

  useEffect(() => {
    fetch(`http://localhost:3333/logs/${toggleSingleLog.id}`)
      .then(response =>response.json())
      .then(data => {
        setLog(data.logs);
      })
      .catch(error => console.error('Error fetching log:', error));
  },[toggleSingleLog.id]); // add toggle single log id in dependency when create useState in app.js[]

  if (!log) return <div>didn't get log</div>;

  return (
    <div>
      <h2>{log.title} - {log.captainName}</h2>
      <ul>
        <li>Post: {log.post}</li>
        <li>Mistakes Were Made Today: {log.mistakesWereMadeToday ? '✅' : '❌'}</li>
        <li>Days Since Last Crisis: {log.daysSinceLastCrisis}</li>
      </ul>
    </div>
  );
}

export default Log;