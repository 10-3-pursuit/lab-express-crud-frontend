// note - new log entries (even cURL ones) render on page although the data is not updated in the server (it is stored in local storage)
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Logs = ({ logs, setLogs, setToggleDetails, setEdit }) => { // bring both edit and set edit incase both is needed
  const [detailsVisibility, setDetailsVisibility] = useState({}); // added this to give option to hide / show the post
  const navigate = useNavigate(); // to give option to navigate to the post

  if (logs.length === 0) return null;

  // HANDLE DELETE GOES HERE - bug in previous code wouldn't allow subsequent deletions because needed to filter out already deleted logs

  function deleteLog(id) {
    const options = {
      method: "DELETE",
    };
  
    fetch(`http://localhost:3333/logs/${id}`, options)
      .then((res) => res.json())
      .then((data) => {
        // Filter out the deleted log from the logs state
        const updatedLogs = logs.filter(log => log.id !== id);
        // Update the logs state with the filtered logs
        setLogs(updatedLogs);
      })
      .catch(error => console.error('Error deleting log:', error));
  }
  

  // --- Next 2 fx for hide/show post or navigate to post ---
  const handleDetailsClick = (id) => {
    // Toggle details visibility
    setDetailsVisibility(currentState => ({
      ...currentState,
      [id]: !currentState[id] // [id]: !currentState[id]: This line dynamically updates the property of the state object that corresponds to the id of the item clicked. The value of this property is set to the logical NOT (!) of its current value, effectively toggling the visibility. If the current value is true, it becomes false, and vice versa
    }));
  };

  const navigateToDetails = (id) => {
    setToggleDetails({ show: true, id });
    navigate(`/logs/${id}`);
  };

  return (
    <div className="all-logs">
      <h1>All Logs</h1>
      {logs.map(({ id, captainName, title, post, mistakesWereMadeToday, daysSinceLastCrisis }) => (
        <div key={id} className="logs-list">
          <h3>{title} - by {captainName}:</h3>
          {detailsVisibility[id] && (
            <>
              <p>{post}</p>
              <p>Mistakes Made Today: {mistakesWereMadeToday ? '✅' : '🚫'}</p>
              <p>Days Since Last Crisis: {daysSinceLastCrisis}</p>
            </>
          )}
          <button onClick={() => handleDetailsClick(id)}>
            {detailsVisibility[id] ? 'Hide Details' : 'Show Details'}
          </button>
          <button onClick={() => navigateToDetails(id)}>
            Go To Details
          </button>
          <button onClick={() => deleteLog(id)}>Delete Log</button>
          <button onClick={()=> setEdit({ show: true, id })}>Edit Log</button>
          <hr />
        </div>
      ))}
    </div>
  );
};

export default Logs;