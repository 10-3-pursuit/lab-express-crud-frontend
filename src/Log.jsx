import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

function Log() {
  const { id } = useParams();
  
  const [log, setLog] = useState();

  useEffect(() => {
    fetch(`http://localhost:8888/api/logs/${id}`)
      .then((res) => res.json())
      // .then((data)=> console.log(data))
      .then((data) => setLog(data.log));
  }, [id]);

  if (!log) return null;
  return (
    <div>
      <h1>{log.captainName}</h1>
      <h3>{log.title}</h3>
      <p>{log.post}</p>
      <p>Mistakes were made today: {log.mistakesWereMadeToday ? "true" : "false"}</p>
      <p>days Since Last Crisis:{log.daysSinceLastCrisis}</p>
      <Link to = "/">
        <button>Home</button>
      </Link>
    </div>
  );
}

export default Log;
