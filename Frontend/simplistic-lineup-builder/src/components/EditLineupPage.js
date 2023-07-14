// EditLineupPage.js
import React, { useEffect, useState } from 'react';
import LineupBuilder from './LineupBuilder';
import { useParams } from 'react-router-dom';

function EditLineupPage() {
    const [players, setPlayers] = useState([]);
    const [lineup, setLineup] = useState(null);
    const [totalSalary, setTotalSalary] = useState(0);
    const [lineupName, setLineupName] = useState('');
    const { id } = useParams();

    useEffect(() => {
        fetch('http://localhost:5555/api/players')
            .then(response => response.json())
            .then(data => setPlayers(data));

        fetch(`http://localhost:5555/api/lineups/${id}`)
            .then(response => response.json())
            .then(data => {
                const initialLineup = data.lineup_slots.reduce((acc, slot) => {
                    return {...acc, [slot.role]: slot.player}
                }, {});
                setLineup(initialLineup);
                setTotalSalary(data.lineup_slots.reduce((total, slot) => total + slot.player.salary, 0));
                setLineupName(data.name);
            });
    }, [id]);

    if (!lineup) return <div>Loading...</div>;

    return (
        <div>
            <h1>Edit Lineup Page</h1>
            <LineupBuilder players={players} initialLineupProp={lineup} totalSalary={totalSalary} setTotalSalary={setTotalSalary} lineupName={lineupName} setLineupName={setLineupName} isEditMode={true} initialLineupId={id}/>
        </div>
    );
}

export default EditLineupPage
