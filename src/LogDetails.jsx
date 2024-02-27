import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

const LogDetail = () => {
  const { id } = useParams()
  const [logDetail, setLogDetail] = useState()

  useEffect(() => {
    fetch(`http://localhost:3456/api/logs/${id}`)
    .then((res) => res.json())
    .then((data) => setLogDetail(data.log))
}, [id])

if(!logDetail) return null
  return (
    <div>
      <h3>Captain {logDetail.captainName}</h3>
      <p>Title: {logDetail.title}</p>
      <p>Post: {logDetail.post}</p>
      <p>Mistakes were made today: {logDetail.mistakesWereMadeToday ? "Yes" : "No"}</p>
      <p>Days since last crisis: {logDetail.daysSinceLastCrisis}</p>
      <Link to={'/'}>Home</Link>
    </div>
  )
}

export default LogDetail