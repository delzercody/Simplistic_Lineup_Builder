import React, { useContext } from 'react';
import UserContext from '../UserContext';

function LogoutButton() {
    const { logoutUser } = useContext(UserContext);

    const handleLogout = async () => {
    try {
        const response = await fetch('/logout', { method: 'GET' });

        if (!response.ok) {
        throw new Error('Logout failed');
        }

        logoutUser();
    } catch (error) {
        console.error('Error:', error);
    }
    };

    return (
    <button onClick={handleLogout}>Logout</button>
    );
}

export default LogoutButton;