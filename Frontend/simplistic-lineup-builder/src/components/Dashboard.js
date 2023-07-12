// Dashboard.js
import React from 'react';
import { Link } from 'react-router-dom';

function Dashboard() {
    return (
        <div>
            <h1>Dashboard Page</h1>

            <div className="dashboard-links">
                <Link to="/build-lineup">Build a Lineup</Link>
                <Link to="/saved-lineups">View Saved Lineups</Link>
                <Link to="/user-profile">View User Profile</Link>
                <Link to="/all-players">View All Players</Link>
            </div>
        </div>
    );
}

export default Dashboard