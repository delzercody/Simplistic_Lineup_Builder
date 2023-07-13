// DEFStats.js

import React from 'react';

const DEFStats = ({ stats }) => (
    <div>
        <p>Sacks: {stats.sacks}</p>
        <p>Interceptions: {stats.interceptions}</p>
        <p>Forced Fumbles: {stats.forced_fumbles}</p>
    </div>
);

export default DEFStats