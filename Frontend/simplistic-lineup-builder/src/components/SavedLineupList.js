// SavedLineupList.js
import React from 'react';
import SavedLineupCard from './SavedLineupCard';

function SavedLineupList({ lineups = [] }) {
    if (!Array.isArray(lineups)) {
        return <div>Loading lineups...</div>;
    }
    return (
        <div>
            <h1>Your Saved Lineups</h1>
            {lineups.map(lineup =>
                <SavedLineupCard key={lineup.id} lineup={lineup} />
            )}
        </div>
    );
}

export default SavedLineupList
