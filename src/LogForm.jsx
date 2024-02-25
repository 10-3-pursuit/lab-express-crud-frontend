import { useState } from "react";
// for create fx
const LogForm = () => {
const [log, setLog] = useState({
    captainName: "",
    title: "",
    post: "",
    mistakesWereMadeToday: false,
    daysSinceLastCrisis: 0,
  });
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
          <textarea
            onChange={handleChange}
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
          />
        </label>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default LogForm