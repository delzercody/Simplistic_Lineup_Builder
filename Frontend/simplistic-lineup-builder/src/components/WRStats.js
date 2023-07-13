// WRStats.js

import React from 'react';

const WRStats = ({ stats }) => (
    <div>
        <p>Receptions: {stats.receptions}</p>
        <p>Receiving Yards: {stats.receiving_yards}</p>
        <p>Receiving Touchdowns: {stats.receiving_touchdowns}</p>
    </div>
);

export default WRStats