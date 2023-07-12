// NavBar.js

import React from 'react';
import { Link } from 'react-router-dom'

function NavBar() {
    return (
        <nav>
            <Link to="/">Home</Link>
            <Link to="/dashboard">Dashboard</Link>
            <Link to="/players">Players</Link>
            <Link to="/buildlineup">Build Lineup</Link>
            <Link to="/viewsavedlineups">View Saved Lineups</Link>
            <Link to="/userprofile">User Profile</Link>
        </nav>
    );
}

export default NavBar;
