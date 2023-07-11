import React from 'react';
import './App.css';
import HomePage from './components/HomePage';
import PlayersPage from './components/PlayersPage';
import Dashboard from './components/Dashboard'
import ViewSavedLineupsPage from './components/ViewSavedLineupsPage';
import UserProfilePage from './components/UserProfilePage';
import NavBar from './components/NavBar';
import EditLineupPage from './components/EditLineupPage';
import PlayerStatsPage from './components/PlayerStatsPage';
import BuildLineupPage from './components/BuildLineupPage';
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
      <Dashboard />
      <ViewSavedLineupsPage />
      <UserProfilePage />
      <NavBar />
      <EditLineupPage />
      <PlayerStatsPage />
      <BuildLineupPage />
      {/* Render other components here */}
    </div>
  );
}

export default App;
