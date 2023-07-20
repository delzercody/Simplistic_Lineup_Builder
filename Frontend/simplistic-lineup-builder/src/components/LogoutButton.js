import React, { useContext } from 'react';
import UserContext from '../UserContext';
import { useNavigate } from 'react-router-dom'

function LogoutButton() {
    const navigate = useNavigate()
    const { logoutUser } = useContext(UserContext);

    const handleLogout = async () => {
    try {
        const response = await fetch('/logout', { method: 'GET' });

        if (!response.ok) {
        throw new Error('Logout failed');
        }

        logoutUser();
        navigate('/')
    } catch (error) {
        console.error('Error:', error);
    }
    };

    return (
    <button class="btn btn-lg btn-outline-light btn-block mb-3 container" onClick={handleLogout}>Logout</button>
    );
}

export default LogoutButton;