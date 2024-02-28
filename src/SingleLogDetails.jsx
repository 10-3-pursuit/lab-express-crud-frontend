import { useEffect, useState } from "react";

const SingleLogDetails = ({ toggleLogs }) => {
  const [singleLogDetails, setSingleLogDetails] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:3333/logs/${toggleLogs.id}`)
      .then((res) => res.json())
      .then((data) => setSingleLogDetails(data.logs));
  }, [toggleLogs.id]);
  if (!singleLogDetails) return null;

  return (
    <div>
      <div>
        <h1>Log Details</h1>
        <h3>Captain Name: {singleLogDetails.captainName}</h3>
        <p>Title: {singleLogDetails.title}</p>
        <p>Post: {singleLogDetails.post}</p>
        <p>
          Mistakes Were Made Today:{" "}
          {singleLogDetails.mistakesWereMadeToday ? "Yes" : "No"}
        </p>
        <p>Days Since Crisis:{singleLogDetails.daysSinceLastCrisis}</p>
        <hr />
      </div>
    </div>
  );
};

export default SingleLogDetails;
