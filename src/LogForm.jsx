// for create fx using POST
import { useState } from "react";

const LogForm = ({ setLogs, setToggleForm }) => { // bring all logs data from useState setLogs in app.jsx for fetch
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

  //handle submit with prevent default, the options object that contains json.stringify, then the fetch for response, get data with setLog, then reset form


  //change handle submit so edit form works too (PUT)
  const handleSubmit = (e) => {
    e.preventDefault();
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(log)
    };
    fetch('http://localhost:3333/logs/', options)
    .then((res) => res.json())
    .then((data)=> setLogs(data.logs)) // key is called logs in local storage
    .then(() => setToggleForm(false))
    .then(()=>setEdit({ show: false, id: null }));
  }

  // handle cancel

  // add useEffect to toggle show / hide editing form

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
      </form>
    </section>
  );
}

export default LogForm