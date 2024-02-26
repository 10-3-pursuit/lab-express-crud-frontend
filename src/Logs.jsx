


const Logs = ({ logs, setLogs, setToggleDetails, setEdit, setToggleForm }) => {

    if(logs.length === 0) return null

    function handleDelete(id){
        console.log(id)
        const options = {
            method: "DELETE",
        }

        fetch(`http://localhost:3456/logs/${id}`, options)
        .then((res) => res.json())
        .then((data) => setLogs(data.logs))
        .then(setToggleDetails({ show: false, id: null }))
        .then(setEdit({ show: false, id: null }))
        .then(setToggleForm(false))
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
                <button onClick={()=>setToggleDetails({show: true, id })}>
                Details
                </button>
                <button onClick={() => setEdit({ show: true, id })}>
                    Edit
                </button>
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

