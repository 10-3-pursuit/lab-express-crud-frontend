import { Link } from "react-router-dom";

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
          <Link to= {`/${id}`}>
            <button>Details</button>
          </Link>
          <Link to = {`/edit/${id}`}>
            <button>Edit</button>
          </Link>
          <button onClick={() => handleDelete(id)}>Delete</button>
          <hr />
        </div>
      ))}
    </div>
  );
}

export default Logs;
