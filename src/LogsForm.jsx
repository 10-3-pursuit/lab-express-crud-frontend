import { useState, useEffect } from "react";

const LogsForm = ({ setLogs, setToggleLogForm }) => {
  const [log, setLog] = useState({
    captainName: "",
    title: "",
    post: "",
    mistakesWereMadeToday: false,
    daysSinceLastCrisis: "",
  });

  function handleChange(e) {
    setLog({ ...log, [e.target.id]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();

    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(log),
    };

    fetch(`http://localhost:3333/logs`, options)
      .then((res) => res.json())
      .then((data) => setLogs(data.logs))
      // we set to false so that this dissappears from the screen
      .then(() => setToggleLogForm(false))
      //reset the form (brute force way)
      .then(() =>
        setLog({
          captainName: "",
          title: "",
          post: "",
          mistakesWereMadeToday: false,
          daysSinceLastCrisis: "",
        })
      );
  }

  function handleCancel() {
    setToggleLogForm(false);
  }

  return (
    <div>
      <h1>Log Form</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="captainName">
          Captain Name:
          <input
            onChange={handleChange}
            type="text"
            id="captainName"
            name="captainName"
            value={log.captainName}
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
          />
        </label>
        <label htmlFor="post">
          Post:
          <input
            onChange={handleChange}
            type="text"
            id="post"
            name="post"
            value={log.post}
          />
        </label>
        <label htmlFor="mistakesWereMadeToday">
          Mistakes Were Made Today:
          <input
            onChange={handleChange}
            type="checkbox"
            id="mistakesWereMadeToday"
            name="mistakesWereMadeToday"
            value={log.mistakesWereMadeToday}
          />
        </label>
        <label htmlFor="daysSinceLastCrisis">
          Days Since Crisis:
          <input
            onChange={handleChange}
            type="number"
            id="daysSinceLastCrisis"
            name="daysSinceLastCrisis"
            value={log.daysSinceLastCrisis}
          />
        </label>
        <button>Submit</button>
      </form>
      <button onClick={() => handleCancel()}>Cancel</button>
    </div>
  );
};

export default LogsForm;
