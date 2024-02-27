import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const LogForm = ({ logs, setLogs }) => {
  const [userInput, setUserInput] = useState({
    captainName: "",
    title: "",
    post: "",
    mistakesWereMadeToday: false,
    daysSinceLastCrisis: 0,
  });

  const { id } = useParams();
  const navigate = useNavigate();

  // This works, however at every refresh it erases the input field
  // useEffect(() => {
  //   if (id) {
  //     const editedIndex = logs.findIndex((log) => log.id === +id);
  //     if (editedIndex !== -1) {
  //       setUserInput({ ...logs[editedIndex] });
  //     }
  //   }
  // }, [id]);

  useEffect(() => {
    if (id) {
      fetch(`http://localhost:3333/api/logs/${id}`)
        .then((res) => res.json())
        .then((data) => setUserInput(data[0]));
    }
  }, [id]);

  function handleChange(event) {
    if (event.target.id === "daysSinceLastCrisis") {
      setUserInput({ ...userInput, [event.target.id]: +event.target.value });
    } else if (event.target.id === "mistakesWereMadeToday") {
      setUserInput({ ...userInput, [event.target.id]: event.target.checked });
    } else {
      setUserInput({ ...userInput, [event.target.id]: event.target.value });
    }
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (id) {
      const options = {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userInput),
      };
      fetch(`http://localhost:3333/api/logs/${id}`, options)
        .then((res) => res.json())
        .then((data) => {
          setUserInput(data[0]);
        })
        .then(() => navigate("/logs"))
        .catch((error) => console.error("Error:", error));
    } else {
      const options = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userInput),
      };
      fetch(`http://localhost:3333/api/logs`, options)
        .then((res) => res.json())
        .then((data) => {
          setLogs([...logs, data]);
          setUserInput({
            captainName: "",
            title: "",
            post: "",
            mistakesWereMadeToday: false,
            daysSinceLastCrisis: 0,
          });
        })
        .then(() => navigate("/logs"))
        .catch((error) => console.error("Error:", error));
    }
  }

  return (
    <div className="text-center">
      <h1>{id ? "Edit Log" : "Create Log"}</h1>
      <form onSubmit={handleSubmit} className="w-25 mx-auto">
        <div className="mb-3">
          <label htmlFor="captainName" className="form-label">
            Name
          </label>
          <input
            type="text"
            className="form-control"
            id="captainName"
            onChange={handleChange}
            value={userInput.captainName}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            className="form-control"
            id="title"
            onChange={handleChange}
            value={userInput.title}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="post">Post</label>
          <input
            type="text"
            className="form-control"
            id="post"
            onChange={handleChange}
            value={userInput.post}
          />
        </div>
        <div className="mb-3 form-check">
          <input
            type="checkbox"
            className="form-check-input"
            id="mistakesWereMadeToday"
            onChange={handleChange}
            checked={userInput.mistakesWereMadeToday}
          />
          <label className="form-check-label" htmlFor="mistakesWereMadeToday">
            Mistakes Were Made Today
          </label>
        </div>
        <div className="mb-3">
          <label htmlFor="daysSinceLastCrisis">Days Since Last Crisis</label>
          <input
            type="number"
            className="form-control"
            id="daysSinceLastCrisis"
            onChange={handleChange}
            value={userInput.daysSinceLastCrisis}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default LogForm;
