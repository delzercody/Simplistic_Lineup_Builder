// NavBar.js

import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import UserContext from '../UserContext';
import LogoutButton from './LogoutButton'; // Import LogoutButton here

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
        <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center'  }}>
            <button onClick={handleHomeClick}>Home</button>
            <button onClick={() => navigate('/dashboard')}>Dashboard</button>
            <button onClick={() => navigate('/players')}>Players</button>
            <button onClick={() => navigate('/buildlineup')}>Build Lineup</button>
            <button onClick={() => navigate('/viewsavedlineups')}>View Saved Lineups</button>
            <button onClick={() => navigate('/userprofile')}>User Profile</button>
            {user && (
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                    <img src={user.avatar} alt="user avatar" style={{ height: '30px', marginRight: '10px' }} /> {/* Assuming user object has a property named avatarUrl */}
                    <span>{user.first_name}{user.last_name}</span> {/* Assuming user object has a property named name */}
                    <LogoutButton />
                </div>
            )}
        </nav>
    );
}

export default NavBar