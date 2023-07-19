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
            <button class="btn btn-lg btn-secondary btn-block mb-3" onClick={handleHomeClick}>Home</button>
            <button class="btn btn-lg btn-secondary btn-block mb-3" onClick={() => navigate('/dashboard')}>Dashboard</button>
            <button class="btn btn-lg btn-secondary btn-block mb-3" onClick={() => navigate('/players')}>Players</button>
            <button class="btn btn-lg btn-secondary btn-block mb-3" onClick={() => navigate('/buildlineup')}>Build Lineup</button>
            <button class="btn btn-lg btn-secondary btn-block mb-3" onClick={() => navigate('/viewsavedlineups')}>View Saved Lineups</button>
            <button class="btn btn-lg btn-secondary btn-block mb-3" onClick={() => navigate('/userprofile')}>User Profile</button>
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