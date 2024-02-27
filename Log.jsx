import React from "react";

const Log = ({ log }) => {
  return (
    <div>
      <p>Title: {log.title}</p>
      <p>Post: {log.post}</p>
      <p>Mistakes Were Made Today: {String(log.mistakesWereMadeToday)}</p>
      <p>Days Since Last Crisis: {log.daysSinceLastCrisis}</p>
    </div>
  );
};

export default Log;
