//ViewSavedLineupsPage.js
import React, { useState, useEffect, useContext } from 'react';
import SavedLineupList from './SavedLineupList';
import UserContext from '../UserContext';  // Make sure the import path is correct

function ViewSavedLineupsPage() {
    const { user } = useContext(UserContext);
    const [lineups, setLineups] = useState(null);

    useEffect(() => {
        if (user !== null) {   // Only fetch the data if a user is logged in
            fetch(`http://localhost:5555/api/users/${user.id}/lineups`)
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error('Error fetching lineups');
                }
            })
            .then(data => {
                console.log('Data received:', data)
                setLineups(data);
            })
            .catch(error => {
                console.error('Error:', error);
            });
        }
    }, [user])

    if (!lineups || lineups.length === null) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <SavedLineupList lineups={lineups} />
        </div>
    );
}

export default ViewSavedLineupsPage