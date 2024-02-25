import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Logs = ({ logs, setLogs, setToggleDetails }) => {
  const navigate = useNavigate(); // added this line so when button on click take user to different page to view details
  useEffect(() => {
    fetch("http://localhost:3333/logs/")
      .then((res) => res.json())
      .then((data) => setLogs(data.logs));
  }, []);

  if (logs.length === 0) return null

  const handleDetailsClick = (id) => {
    setToggleDetails({ show: true, id });
    navigate(`/logs/${id}`); // Navigate to the log detail page instead!!
  };

  return (
    <div>
      <h1>Logs</h1>
      {logs.map(({ id, captainName, title, post }) => (
        <div key={id}>
          <h3>{title} - {captainName}</h3>
          <p>{post}</p>
          <button onClick={() => handleDetailsClick(id)}>
            Details
          </button>
          <hr />
        </div>
      ))}
    </div>
  );
};

export default Logs;
// note - new log entries (even cURL ones) render on page although the data is not updated in the server (it is stored in local storage)