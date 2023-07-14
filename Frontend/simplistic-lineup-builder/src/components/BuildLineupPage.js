// BuildLineupPage.js
import React, { useEffect, useState } from 'react';
import LineupBuilder from './LineupBuilder';

function BuildLineupPage() {
    const [players, setPlayers] = useState([]);
    const [totalSalary, setTotalSalary] = useState(0);
    const [totalPoints, setTotalPoints] = useState(0);
    const [totalOwnership, setTotalOwnership] = useState(0)
    const [lineupName, setLineupName] = useState('');

    useEffect(() => {
        fetch('http://localhost:5555/api/players')
        .then(response => response.json())
        .then(data => setPlayers(data));
    }, []);

    return (
        <div>
            <h1>Build a new Lineup Page</h1>
            <LineupBuilder 
                players={players} 
                totalSalary={totalSalary} 
                setTotalSalary={setTotalSalary} 
                totalPoints={totalPoints} 
                setTotalPoints={setTotalPoints} 
                totalOwnership={totalOwnership} 
                setTotalOwnership={setTotalOwnership} 
                lineupName={lineupName} 
                setLineupName={setLineupName} 
            />
        </div>
    );
}

export default BuildLineupPage
