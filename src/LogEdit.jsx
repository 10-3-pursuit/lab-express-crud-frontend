import { useState, useEffect } from 'react'

const LogEdit = ({ setLogs, setToggleForm, setEdit, edit}) => {

    const [log, setLog] = useState({
        captainName: "",
        title: "",
        post: "",
        mistakesWereMadeToday: false,
        daysSinceLastCrisis: 0,
    });

    function handleChange(event) {
        setLog({ ...log, [event.target.id]: event.target.value });
      }

      function handleSubmit(){
        const options = {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(log),
          };
    
          fetch(`http://localhost:3456/logs/${edit.id}`, options)
            .then((res) => res.json())
            .then((data) => setLogs(data.logs))
            .then(() => setToggleForm(false))
            .then(() => setEdit({ show: false, id: null }));
    }
    function handleCancel(){
        setEdit({ show: false, id: null })
    }

    useEffect(() => {
        if (edit.show) {
          fetch(`http://localhost:3456/logs/${edit.id}`)
            .then((res) => res.json())
            .then((data) => setLog(data.log));
        }
      }, [edit.id]);

  return (
    <div>
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

export default LogEdit