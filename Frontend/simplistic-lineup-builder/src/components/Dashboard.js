// Dashboard.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
    const navigate = useNavigate()
    return (
        <div>
            <h1>Dashboard Page</h1>

            <div className="dashboard-links" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center'  }}>
            <button class="btn btn-dark btn-block mb-4" onClick={() => navigate('/buildlineup')}>Build a Lineup</button>
            <button class="btn btn-dark btn-block mb-4" onClick={() => navigate('/viewsavedlineups')}>View Saved Lineups</button>
            <button class="btn btn-dark btn-block mb-4" onClick={() => navigate('/userprofile')}>View User Profile</button>
            <button class="btn btn-dark btn-block mb-4" onClick={() => navigate('/players')}>View All Players</button>
            </div>
        </div>
    );
}

export default Dashboard