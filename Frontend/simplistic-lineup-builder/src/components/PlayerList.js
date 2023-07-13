// PlayerList.js

import React, { useEffect, useState } from 'react';
import PlayerCard from './PlayerCard';

const PlayerList = () => {
const [players, setPlayers] = useState([]);

useEffect(() => {
    fetch('http://localhost:5555/api/players')
    .then(response => response.json())
    .then(data => setPlayers(data));
}, []);

    return (
    <table>
        <thead>
            <tr>
                <th>Position</th>
                <th>Name</th>
                <th>Team</th>
                <th>Salary</th>
                <th>Projected Points</th>
                <th>Ownership Percentage</th>
                <th>Next Game</th>
            </tr>
        </thead>
        <tbody>
            {players.map(player => <PlayerCard key={player.id} player={player} />)}
        </tbody>
    </table>
);
};

export default PlayerList
