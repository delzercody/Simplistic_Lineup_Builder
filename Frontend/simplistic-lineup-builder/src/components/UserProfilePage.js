// UserProfilePage.js

import React, { useState, useEffect, useContext } from 'react';
import UserContext from '../UserContext';
import ViewSavedLineupsPage from './ViewSavedLineupsPage'

function UserProfilePage() {
    const { user } = useContext(UserContext);
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        if (user !== null) {
            fetch(`http://localhost:5555/api/users/${user.id}`) // Assumption is that user object has an id property
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error('Error fetching user data');
                }
            })
            .then(data => {
                setUserData(data);
            })
            .catch(error => {
                console.error('Error:', error);
            });
        }
    }, [user]);

    if (userData === null) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>{userData.username}'s Profile</h1>
            <p>{userData.bio}</p>
            <img src={userData.avatar} alt="user avatar" /> {/* Display user's avatar here */}
            {/* display other user info here */}
            <div>
                <ViewSavedLineupsPage /> {/* Display saved lineups here */}
            </div>
        </div>
    );
}

export default UserProfilePage;
