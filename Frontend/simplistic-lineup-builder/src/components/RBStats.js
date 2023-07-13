// RBStats.js

import React from 'react';

const RBStats = ({ stats }) => (
    <div>
        <p>Rushing Yards: {stats.rushing_yards}</p>
        <p>Rushing Touchdowns: {stats.rushing_touchdowns}</p>
        <p>Receptions: {stats.receptions}</p>
        <p>Receiving Yards: {stats.receiving_yards}</p>
        <p>Receiving Touchdowns: {stats.receiving_touchdowns}</p>
    </div>
);

export default RBStats