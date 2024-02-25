import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div>
      <header>
        <h1>Log Details</h1>
      </header>
      <main>
        <Routes>
          <Route path="/logs"/>
        </Routes>
      </main>
    </div>
  );
}

export default App;