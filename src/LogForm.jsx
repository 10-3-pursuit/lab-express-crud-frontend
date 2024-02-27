import { useState, useEffect } from 'react';
import { useNavigate, useParams } from "react-router-dom";

function LogForm({ setLogs, setToggleForm, edit, setEdit }) {

  const navigate = useNavigate();
  const { id } = useParams();

  const [log, setLog] = useState({
    captainName: "",
    title: "",
    post: "",
    mistakesWereMadeToday: false,
    daysSinceLastCrisis: 0,
  });

  function handleChange(e) {
    const { id, type, checked, value } = e.target;
    const newValue = type === 'checkbox' ? checked : value;
    setLog({ ...log, [id]: newValue });
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (id) {
      const options = {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(log),
      };

      fetch(`http://localhost:8888/api/logs/${id}`, options)
        .then((res) => res.json())
        .then((data) => setLogs(data.logs))
        .then(() => navigate("/"));
    }else{
        const options = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(log),
        };

        fetch("http://localhost:8888/api/logs", options)
        .then((res) => res.json())
        .then((data) => {
            setLogs(data.logs);
            navigate("/");
        });
    }
  }

  function handleCancel() {
    navigate("/");
  }
  

  useEffect(() => {
    if (id) {
      fetch(`http://localhost:8888/api/logs/${id}`)
        .then((res) => res.json())
        .then((data) => setLog(data.log));
    }else {
      setLog({
        captainName: "",
        title: "",
        post: "",
        mistakesWereMadeToday: false,
        daysSinceLastCrisis: 0,
      });
    }
  }, [id]);

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
          Mistakes were made today:
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
      <button onClick={handleCancel}>Cancel</button>
    </div>
  );
}

export default LogForm;
