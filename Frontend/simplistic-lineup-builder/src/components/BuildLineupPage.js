// BuildLineupPage.js
import React, { useEffect, useState } from 'react';
import LineupBuilder from './LineupBuilder';

function BuildLineupPage() {
    const [players, setPlayers] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5555/api/players')
        .then(response => response.json())
        .then(data => setPlayers(data));
    }, []);

    return (
        <div>
            <h1>Build a new Lineup Page</h1>
            <LineupBuilder players={players} />
        </div>
    );
}

export default BuildLineupPage
