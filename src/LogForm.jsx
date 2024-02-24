import { useState }from 'react'

const LogForm = ({ setLogs, setToggleForm }) => {
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
        [event.target.id]: event.target.value 
    })
    }

    function handleSubmit(event){
        event.preventDefault();

        const options = {
            method: "POST",
            headers: { "Content-Type": "application/json"},
            body: JSON.stringify(log)
        }

        fetch("http://localhost:3456/logs", options)
        .then((res) => res.json())
        .then((data) => setLogs(data.logs))
        .then(()=> setToggleForm(false))
        .then(()=> setLog({
            captainName: "",
            title: "",
            post: "",
            mistakesWereMadeToday: false,
            daysSinceLastCrisis: null,
        }))
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
                <div>
                    Post:
                </div>
                <textarea
                type="text"
                onChange={handleChange}
                id="post" 
                name="post"
                value={log.post}
                />
            </label>
            </div>
            <button>Submit</button>
        </form>
    </div>
  )
}

export default LogForm