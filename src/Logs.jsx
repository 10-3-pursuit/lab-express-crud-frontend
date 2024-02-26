import { useState, useEffect } from "react"; // since useState for form is here now remember to put useState and import LogForm.jsx
import { useNavigate } from "react-router-dom";
//import LogForm from "./LogForm";

const Logs = ({ logs, setLogs, setToggleDetails }) => {
  // const [toggleForm, setToggleForm] = useState(false); // moved form view to this component
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
    <div className="all-logs">
      <h1>All Logs</h1>
      {logs.map(({ id, captainName, title, post,mistakesWereMadeToday, daysSinceLastCrisis }) => (
        <div key={id} className="logs-list">
          <h3>{title} - by {captainName}</h3>
          <p>{post}</p>
          <p>
            Mistakes Made Today: {mistakesWereMadeToday ? 'Yes' : 'No'}
          </p>
          <p>Days Since Last Crisis: {daysSinceLastCrisis}</p>
          <button onClick={() => handleDetailsClick(id)} >
            D E T A I L S
          </button>
          {/* divider for tables */}
          <hr />
        </div>
      ))}
    </div>
  );
};

export default Logs;
// note - new log entries (even cURL ones) render on page although the data is not updated in the server (it is stored in local storage)