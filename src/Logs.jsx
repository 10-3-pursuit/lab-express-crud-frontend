import { useEffect } from 'react';

function Logs({ logs, setLogs, setToggleDetails,edit,setEdit }) {
  if (logs.length === 0) return null;

  function handleDelete(id) {
    const options = {
      method: "DELETE",
    };

    fetch(`http://localhost:8888/api/logs/${id}`, options)
      .then((res) => res.json())
      .then((data) => setLogs(data.logs));
  }

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
          <button onClick={()=>setEdit({show:true, id })}>Edit</button>
          <button onClick={() => handleDelete(id)}>Delete</button>
          <hr />
        </div>
      ))}
    </div>
  );
}

export default Logs;
