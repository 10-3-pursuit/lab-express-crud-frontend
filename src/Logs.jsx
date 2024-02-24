import { useEffect } from "react";


const Logs = ({ logs, setLogs, setToggleDetails }) => {

    useEffect(() => {
        fetch('http://localhost:3456/logs')
        .then((res) => res.json())
        .then((data) => setLogs(data.logs))
    }, [])

    if(logs.length === 0) return null

  return (
    <div>
        <h1>Logs</h1>
        {logs.map(({ id, captainName, title }) => (
            <div key={id}>
                <h3>Captain {captainName}</h3>
                <p>Title: {title}</p>
                {/* <p>Post: {log.post}</p>
                <p>Mistakes were made today: {log.mistakesWereMadeToday.toString()}</p>
                <p>Days since last crisis: {log.daysSinceLastCrisis}</p> */}
                <button onClick={()=>setToggleDetails({show: true, id })}>
                Details
            </button>
            <hr />
            </div>
        ))}
    </div>
  )
}

export default Logs

