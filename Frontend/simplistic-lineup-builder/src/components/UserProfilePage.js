// UserProfilePage.js

import React, { useState, useEffect, useContext } from 'react';
import UserContext from '../UserContext';

function UserProfilePage() {
    const { userId } = useContext(UserContext);
    const [user, setUser] = useState(null);

    useEffect(() => {
    if (userId !== null) {
        fetch(`/api/users/${userId}`)
        .then(response => {
            if (response.ok) {
            return response.json();
            } else {
            throw new Error('Error fetching user data');
            }
        })
        .then(data => {
            setUser(data);
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }
    }, [userId]);

    if (user === null) {
    return <div>Loading...</div>;
    }

    return (
    <div>
        <h1>{user.username}'s Profile</h1>
        <p>{user.bio}</p>
      {/* display other user info here */}
    </div>
    );
}

export default UserProfilePage;
