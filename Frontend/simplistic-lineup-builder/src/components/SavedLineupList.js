// SavedLineupList.js
import React from 'react';
import SavedLineupCard from './SavedLineupCard';

function SavedLineupList({ lineups = [] }) {
    if (!Array.isArray(lineups)) {
        return <div>Loading lineups...</div>;
    }
    return (
        <div class='container'>
            <h1>Your Saved Lineups</h1>
            <div style={{display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "30px"}}>
                {lineups.map(lineup =>
                    <SavedLineupCard key={lineup.id} lineup={lineup} />
                )}
            </div>
        </div>
    );
}

export default SavedLineupList
