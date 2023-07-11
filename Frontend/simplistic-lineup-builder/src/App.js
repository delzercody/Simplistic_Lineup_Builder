import React from 'react';
import './App.css';
import HomePage from './components/HomePage';
import PlayersPage from './components/PlayersPage';
// Import other components here

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      <HomePage />
      <PlayersPage />
      {/* Render other components here */}
    </div>
  );
}

export default App;
