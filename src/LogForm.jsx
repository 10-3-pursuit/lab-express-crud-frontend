import { useState }from 'react'
import { useNavigate } from "react-router-dom";

const LogForm = ({ setLogs }) => {
    const navigate = useNavigate();
    const [log, setLog] = useState({
        captainName: "",
        title: "",
        post: "",
        mistakesWereMadeToday: false,
        daysSinceLastCrisis: null,
    });

    function handleChange(event){
    setLog({
        ...log, 
        [event.target.name]: event.target.value 
    })
    }

    function handleSubmit(event){
        event.preventDefault();

        const options = {
            method: "POST",
            headers: { "Content-Type": "application/json"},
            body: JSON.stringify(log)
        }

        fetch("http://localhost:3456/api/logs", options)
        .then((res) => res.json())
        .then((data) => setLogs(data.logs))
        .then(navigate("/"))
    }

    function handleCancel(){
        navigate("/");
      }

  return (
    <div>
        <h1>Log Form</h1>
        <form onSubmit={handleSubmit}>
            <div>
            <label htmlFor="captainName">
                Name:
                <input 
                onChange={handleChange}
                type="text" 
                id="captainName"
                name="captainName"
                value={log.captainName}
                />
            </label>
            </div>
            <div>
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
            </div>
            <div>
            <label htmlFor="post">
                Post:
                <textarea
                type="text"
                onChange={handleChange}
                id="post" 
                name="post"
                value={log.post}
                />
            </label>
            </div>
            <div>
            <label htmlFor="mistakesWereMadeToday">
                Mistakes were made today: 
                <select
                onChange={handleChange}
                id="mistakesWereMadeToday" 
                name="mistakesWereMadeToday"
                value={log.mistakesWereMadeToday}
                >
                <option value={true}>Yes</option>
                <option value={false}>No</option>
                </select>
            </label>
            </div>
            <div>
                <label htmlFor="daysSinceLastCrisis">
                    Days Since Last Crisis:
                    <input
                    type="number"
                    onChange={handleChange}
                    id="daysSinceLastCrisis" 
                    name="daysSinceLastCrisis"
                    value={log.daysSinceLastCrisis}
                    />
                </label>
            </div>
            <button>Submit</button>
        </form>
        <button onClick={handleCancel}>
        Cancel
      </button>
    </div>
  )
}

export default LogForm