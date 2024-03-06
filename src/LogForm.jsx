// for create fx using POST
import { useState, useEffect } from "react";

const LogForm = ({ setLogs, setToggleForm, edit, setEdit }) => { // bring all logs data from useState setLogs in app.jsx for fetch
const [log, setLog] = useState({
    captainName: "",
    title: "",
    post: "",
    mistakesWereMadeToday: false,
    daysSinceLastCrisis: 0,
  });
    
  //handle change
  const handleChange = (e) => {
    setLog({ ...log, [e.target.id]: e.target.value })
  }

  // handle submit with prevent default, the options object that contains json.stringify, then the fetch for response, get data with setLog, then reset form


  // change handle submit so edit form works too (PUT)

const handleSubmit = (e) => {
  e.preventDefault();

  if (edit.show) {
    const options = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(log),
    };
    fetch(`http://localhost:3333/logs/${edit.id}`, options)
      .then((res) => res.json())
      .then((data) => {
        setLogs(data.logs);
        setToggleForm(false);
        setEdit({ show: false, id: null });
      })
      .catch(error => console.error('Error updating log:', error));
  } else {
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(log)
    };
    fetch('http://localhost:3333/logs/', options)
      .then((res) => res.json())
      .then((data) => {
        setLogs(data.logs);
        setToggleForm(false);
        setEdit({ show: false, id: null });
      })
      .catch(error => console.error('Error adding log:', error));
  }
};


  // handle cancel - set state for edit & create so it cancels either one no matter which one
  function handleCancel() {
    setEdit({ show: false, id: null });
    setToggleForm(false); // false hides it again
  }

  // for edit (PUT) add useEffect to toggle show / hide editing form (useEffect will run no matter what asynchronously according to dependency so must put if statement)
  useEffect(() => {
    if (edit.show) {
      fetch(`http://localhost:3333/logs/${edit.id}`)
      .then((res)=>res.json())
      .then((data)=> setLog(data));
    }
  }, [edit.id]);

  return (
    <section>
      <h2>Log Form:</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="captainName">
          Captain Name:
          <input
            onChange={handleChange}
            type="text"
            id="captainName"
            name="captainName"
            value={log.captainName}
            required
          />
        </label>
        <label htmlFor="title">
          Title:
          <input
            onChange={handleChange}
            type="text"
            id="title"
            name="title"
            value={log.title}
            required
          />
        </label>
        <label htmlFor="post">
          Post:
          <textarea
            onChange={handleChange}
            id="post"
            name="post"
            value={log.post}
            required
          />
        </label>
        <label htmlFor="mistakesWereMadeToday">
          Mistakes Were Made Today:
          <input
            onChange={handleChange}
            type="checkbox"
            id="mistakesWereMadeToday"
            name="mistakesWereMadeToday"
            checked={log.mistakesWereMadeToday}
          />
        </label>
        <label htmlFor="daysSinceLastCrisis">
          Days Since Last Crisis:
          <input
            onChange={handleChange}
            type="number"
            id="daysSinceLastCrisis"
            name="daysSinceLastCrisis"
            value={log.daysSinceLastCrisis}
            required
          />
        </label>
        <button type="submit">Submit</button>
        <button onClick={handleCancel} className='cancel-btn'>Cancel</button>
      </form>
    </section>
  );
}

export default LogForm