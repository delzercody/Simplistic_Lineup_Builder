// App.js

import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './components/HomePage';
import PlayersPage from './components/PlayersPage';
import Dashboard from './components/Dashboard'
import ViewSavedLineupsPage from './components/ViewSavedLineupsPage';
import UserProfilePage from './components/UserProfilePage';
import NavBar from './components/NavBar';
import EditLineupPage from './components/EditLineupPage';
import PlayerStatsPage from './components/PlayerStatsPage';
import BuildLineupPage from './components/BuildLineupPage';
import LogoutButton from './components/LogoutButton';

import { UserProvider } from './UserContext';

function App() {
  return (
    <UserProvider>
      <div className="App">
        {/* <header className="App-header">
        </header> */}
        <Router>
          <NavBar />
          <Routes>
            <Route path="/" element={<HomePage />} /> {/* Include Login/SignUp forms here */}
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/players" element={<PlayersPage />} />
            <Route path="/buildlineup" element={<BuildLineupPage />} />
            <Route path="/lineups/edit/:id" element={<EditLineupPage />} />
            <Route path="/viewsavedlineups" element={<ViewSavedLineupsPage />} />
            <Route path="/userprofile" element={<UserProfilePage />} />
            <Route path="/players/:id" element={<PlayerStatsPage />} />
          </Routes>
          <LogoutButton />
        </Router>
      </div>
    </UserProvider>
  );
}

export default App;
