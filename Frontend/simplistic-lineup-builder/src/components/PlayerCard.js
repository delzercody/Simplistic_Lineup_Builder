// PlayerCard.js

import React from 'react';
import { Link } from 'react-router-dom';

const PlayerCard = ({ player }) => {
    return (
        <tr>
        <td>{player.position}</td>
        <td><Link to={`/players/${player.id}`}>{player.name}</Link></td>
        <td>{player.team}</td>
        <td>{player.salary}</td>
        <td>{player.projected_points}</td>
        <td>{player.ownership_percentage}</td>
        <td>{player.team_game}</td>
        </tr>
        );
    };

export default PlayerCard
