import { useEffect, useState } from 'react';

const LogDetail = ({ toggleDetails }) => {
  const [logDetail, setLogDetail] = useState()

  useEffect(() => {
    fetch(`http://localhost:3456/logs/${toggleDetails.id}`)
    .then((res) => res.json())
    .then((data) => setLogDetail(data.log))
}, [toggleDetails.id])

if(!logDetail) return null
  return (
    <div>
      <h3>{logDetail.captainName}</h3>
      <p>Title: {logDetail.title}</p>
      <p>Post: {logDetail.post}</p>
      <p>Mistakes were made today: {logDetail.mistakesWereMadeToday ? "Yes" : "No"}</p>
      <p>Days since last crisis: {logDetail.daysSinceLastCrisis}</p>
    </div>
  )
}

export default LogDetail