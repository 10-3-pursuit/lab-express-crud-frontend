import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const LogForm = ({ logs, setLogs }) => {
  // CREATE OBJECT STATE TO HOLD INFO
  const [userInput, setUserInput] = useState({
    captainName: "",
    title: "",
    post: "",
    mistakesWereMadeToday: "",
    daysSinceLastCrisis: "",
  });

  const { id } = useParams();

  useEffect(() => {
    if (id) {
      const editedIndex = logs.findIndex((log) => log.id === +id);
      if (editedIndex !== -1) {
        setUserInput({ ...logs[editedIndex] });
      }
    }
  }, [id, logs]);

  // Use params ID
  // if the ID is true then run the useeffect and set the form to the userInput
  // create new route so you can grab the id

  const navigate = useNavigate();

  function handleChange(event) {
    // if (event.target.id === "daysSinceLastCrisis") {
    //   setUserInput({ ...userInput, [event.target.id]: +event.target.value });
    // } else if (event.target.id === "mistakesWereMadeToday") {
    //   if (event.target.value === "true") {
    //     setUserInput({ ...userInput, [event.target.id]: true });
    //   } else {
    //     setUserInput({ ...userInput, [event.target.id]: false });
    //   }
    // } else {
    setUserInput({ ...userInput, [event.target.id]: event.target.value });
    // }
  }
  function handleSubmit(event) {
    event.preventDefault();

    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userInput),
    };
    fetch(`http://localhost:3333/api/logs`, options)
      .then((res) => res.json())
      .then((data) => setLogs([...logs, data]));

    setUserInput({
      captainName: "",
      title: "",
      post: "",
      mistakesWereMadeToday: "",
      daysSinceLastCrisis: "",
    });
    navigate("/logs");
  }

  return (
    // DONT FORGET TO ADD VALUE
    <div className="text-center">
      <h1>Create a Log</h1>
      <form onSubmit={handleSubmit} className="w-25 mx-auto">
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
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
        <div className="mb-3">
          <label htmlFor="mistakes">Mistakes Were Made Today</label>
          <input
            type="text"
            className="form-control"
            id="mistakesWereMadeToday"
            onChange={handleChange}
            value={userInput.mistakesWereMadeToday}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="crisis">Days Since Last Crisis</label>
          <input
            type="text"
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
