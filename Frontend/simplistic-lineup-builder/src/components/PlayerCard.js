// PlayerCard.js

import React from 'react';
import { Link } from 'react-router-dom';

const PlayerCard = ({ player }) => {
    return (
        <tr>
            <td class='h5'>{player.position}</td>
            <td class='h5'><Link to={`/players/${player.id}`}>{player.name}</Link></td>
            <td class='h5'>{player.team}</td>
            <td class='h5'>{player.salary}</td>
            <td class='h5'>{player.projected_points}</td>
            <td class='h5'>{player.ownership_percentage}</td>
            <td class='h5'>{player.team_game}</td>
        </tr>
    );
};

export default PlayerCard
