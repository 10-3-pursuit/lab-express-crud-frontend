import { useState, useEffect } from 'react';

function Log({ toggleDetails }) {
  const [log, setLog] = useState();

  useEffect(() => {
    fetch(`http://localhost:3333/logs/${toggleDetails.id}`)
      .then(response =>response.json())
      .then(data => {
        setLog(data); // it is data and not data.logs because the homepage for the react app uses "/logs" instead of just "/"
      })
      .catch(error => console.error('Error fetching log:', error));
  },[toggleDetails.id]); // add toggle single log id in dependency when create useState in app.js[]

  if (!log) return null

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