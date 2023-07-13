// NavBar.js

import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import UserContext from '../UserContext';

function NavBar() {
    const { user } = useContext(UserContext);
    const navigate = useNavigate();

    const handleHomeClick = () => {
        if (user) {
            navigate('/dashboard');
        } else {
            navigate('/');
        }
    };

    return (
        <nav>
            <button onClick={handleHomeClick}>Home</button>
            <button onClick={() => navigate('/dashboard')}>Dashboard</button>
            <button onClick={() => navigate('/players')}>Players</button>
            <button onClick={() => navigate('/buildlineup')}>Build Lineup</button>
            <button onClick={() => navigate('/viewsavedlineups')}>View Saved Lineups</button>
            <button onClick={() => navigate('/userprofile')}>User Profile</button>
        </nav>
    );
}

export default NavBar