import { Link } from "react-router-dom"


const Logs = ({ logs, setLogs }) => {

    if(logs.length === 0) return null

    function handleDelete(id){
        console.log(id)
        const options = {
            method: "DELETE",
        }

        fetch(`http://localhost:3456/api/logs/${id}`, options)
        .then((res) => res.json())
        .then((data) => setLogs(data.logs))
    }

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
                <Link to={`/${id}`}>
                    <button>Details</button>
                </Link>
                <Link to={`/edit/${id}`}>
                    <button>Edit</button>
                </Link>
                <button onClick={() => handleDelete(id)}>
                Delete
            </button>
            <hr />
            </div>
        ))}
    </div>
  )
}

export default Logs

