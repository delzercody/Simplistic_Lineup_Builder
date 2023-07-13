// PlayerCardDetailed.js

import React from 'react';
import { useNavigate } from 'react-router-dom'
import QBStats from './QBStats';
import RBStats from './RBStats';
import WRStats from './WRStats';
import TEStats from './TEStats';
import DEFStats from './DEFStats';

const PlayerCardDetailed = ({ player }) => {
    const { position, player_stats } = player;
    const stats = player_stats[0].stats

    const navigate = useNavigate()

    const renderPositionStats = () => {
        switch (position) {
            case 'QB':
                return <QBStats stats={stats} />;
            case 'RB':
                return <RBStats stats={stats} />;
            case 'WR':
                return <WRStats stats={stats} />;
            case 'TE':
                return <TEStats stats={stats} />;
            case 'DEF':
                return <DEFStats stats={stats} />;
            default:
                return <p>Invalid position</p>;
        }
    };

    const handleBackClick = () => {
        navigate(-1);  // go back to the previous page
    }
    return (
        <div>
            <h1>{player.name}</h1>
            <h2>{player.position}</h2>
            <h3>{player.team}</h3>
            {renderPositionStats()}
            <button onClick={handleBackClick}>Back</button>
        </div>
    );
};

export default PlayerCardDetailed
