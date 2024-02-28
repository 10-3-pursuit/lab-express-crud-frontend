import React from "react";
import { useState, useEffect } from "react";

const LogEdit = ({ edit, setEdit, setLogs, setToggleLogForm }) => {
  const [log, setLog] = useState({
    captainName: "",
    title: "",
    post: "",
    mistakesWereMadeToday: false,
    daysSinceLastCrisis: "",
  });

  function handleEdit(e) {
    // e = event
    e.preventDefault();
    const options = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(log),
    };

    fetch(`http://localhost:3333/logs/${id}`, options)
      .then((res) => res.json())
      .then((data) => setlogs(data.logs))
      .then(() => setToggleLogForm(false))
      .then(() => setEdit({ show: false, id: null }));
  }

  function handleChange(e) {
    setLog({ ...log, [e.target.id]: e.target.value });
  }

  function handleCancel() {
    setToggleLogForm(false);
  }

  useEffect(() => {
    if (edit.show) {
      fetch(`http://localhost:3333/logs/${edit.id}`)
        .then((res) => res.json())
        .then((data) => setLog(data.log));
    }
  }, [edit.id]);

  return (
    <div>
      <form onSubmit={handleEdit}>
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
    </div>
  );
};

export default LogEdit;
