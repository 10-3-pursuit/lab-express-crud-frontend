import { Routes, Route } from 'react-router-dom';
import Log from './Log';

function App() {
  const logId = 1
  return (
    <div>
      <header>
        <h1>Log Details</h1>
      </header>
      <main>
        <Routes>
          <Route path="/logs"/>
          <Route path="/logs/:id" element={<Log logId={logId}/>}/>
        </Routes>
      </main>
    </div>
  );
}

export default App;