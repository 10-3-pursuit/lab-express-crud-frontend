import { useState } from "react";

const App = () => {
  const [logs, setLogs] = useState([]);

  return (
    <div>
      <h1>Logs CRUD</h1>
      <Logs logs={logs} />
    </div>
  );
};

export default App;
