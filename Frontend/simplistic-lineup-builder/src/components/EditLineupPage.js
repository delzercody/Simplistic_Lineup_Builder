// EditLineupPage.js

import React from 'react';
import LineupPlayerList from './LineupPlayerList';
import PlayerList from './PlayerList';
import PlayerFilter from './PlayerFilter';

function EditLineupPage() {
    return (
        <div>
            <h1>Edit a Lineup Page</h1>
            <LineupPlayerList />
            <PlayerList />
            <PlayerFilter />
        </div>
    );
}

export default EditLineupPage;
