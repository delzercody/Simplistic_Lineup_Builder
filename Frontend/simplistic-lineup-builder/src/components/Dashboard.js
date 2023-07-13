// Dashboard.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
    const navigate = useNavigate()
    return (
        <div>
            <h1>Dashboard Page</h1>

            <div className="dashboard-links">
            <button onClick={() => navigate('/buildlineup')}>Build a Lineup</button>
            <button onClick={() => navigate('/viewsavedlineups')}>View Saved Lineups</button>
            <button onClick={() => navigate('/userprofile')}>View User Profile</button>
            <button onClick={() => navigate('/players')}>View All Players</button>
            </div>
        </div>
    );
}

export default Dashboard