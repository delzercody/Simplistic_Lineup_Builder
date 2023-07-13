// QBStats.js

import React from 'react';

function QBStats({ stats }) {
    console.log('stats', stats)
    if (!stats || !stats.passing_yards) {
        return <div>No stats available</div>;
    }

    return (
        <div>
        <p>Passing Yards: {stats.passing_yards}</p>
        <p>Passing Touchdowns: {stats.passing_touchdowns}</p>
        <p>Interceptions: {stats.interceptions}</p>
    </div>
);
}

export default QBStats