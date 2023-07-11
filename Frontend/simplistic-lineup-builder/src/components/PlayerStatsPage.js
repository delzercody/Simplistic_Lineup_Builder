// PlayerStatsPage.js

import React from 'react';
import PlayerCardDetailed from './PlayerCardDetailed';

function PlayerStatsPage() {
    return (
        <div>
            <h1>This is the Player Stats Page to see detailed stats of a clicked on player. It will need to have a return to previous button.</h1>
            <PlayerCardDetailed />
        </div>
    );
}

export default PlayerStatsPage;
