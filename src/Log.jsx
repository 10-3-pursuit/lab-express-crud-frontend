import { useState, useEffect } from 'react';

function Log({ logId }) {
  const [log, setLog] = useState();

  useEffect(() => {
    fetch(`http://localhost:3000/logs/${logId}`)
      .then(response =>response.json())
      .then(data => {
        setLog(data.logs);
      })
      .catch(error => console.error('Error fetching log:', error));
  }); // add toggle single log id in dependency when create useState in app.js[]

  if (!log) return null;

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