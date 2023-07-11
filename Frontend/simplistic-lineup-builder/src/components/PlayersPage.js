// PlayersPage.js

import React from 'react';
import PlayerList from './PlayerList';
import PlayerFilter from './PlayerFilter';

function PlayersPage() {
    return (
        <div>
            <h1>Players Page</h1>
            <PlayerFilter />
            <PlayerList />
        </div>
    );
}

export default PlayersPage;
