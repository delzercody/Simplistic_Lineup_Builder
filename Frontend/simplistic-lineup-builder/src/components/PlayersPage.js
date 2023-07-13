// PlayersPage.js

import React from 'react';
import PlayerList from './PlayerList';

const PlayersPage = () => {
    return (
        <div>
            <h1>All Players</h1>
            <PlayerList />
            {/* Add PlayerFilter component here when it's ready */}
        </div>
);
};

export default PlayersPage
