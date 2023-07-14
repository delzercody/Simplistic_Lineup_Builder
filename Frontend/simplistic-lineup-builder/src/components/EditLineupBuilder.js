// EditLineupBuilder.js
import React, { useState, useContext } from 'react';
import UserContext from '../UserContext';

const EditLineupBuilder = ({ players, initialLineup }) => {
    const { user } = useContext(UserContext)

    const [lineup, setLineup] = useState(initialLineup.lineup_slots.reduce((acc, slot) => {
        acc[slot.role] = slot.player;
        return acc;
    }, {}))
    const [lineupName, setLineupName] = useState(initialLineup.name)
    const [totalSalary, setTotalSalary] = useState(initialLineup.lineup_slots.reduce((acc, slot) => acc + slot.player.salary, 0))
    const [feedback, setFeedback] = useState('')

    const handlePlayerChange = (role, player) => {
        // Your logic for handling player change...
    };

    const handleRemovePlayer = (role) => {
        // Your logic for removing a player...
    };

    const handleSaveLineup = () => {
        // Your validation code here...

        // Prepare data to be sent to server
        const lineupData = {
            name: lineupName,
            user_id: user.id, // Get userId from user context
            lineup_slots: Object.entries(lineup).map(([role, player]) => ({player_id: player.id, role})) // Change here
        }
        console.log("Lineup data to be sent:", lineupData)
    
        fetch(`http://localhost:5555/api/lineups/${initialLineup.id}`, {
            method: 'PUT',  // Change here to PUT
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(lineupData)
        })
        .then(response => response.json())
        .then(data => {
            console.log(data)
            setLineup(initialLineup)
            setLineupName('')
            setTotalSalary(0)
            setFeedback('Lineup saved successfully')
        })
        .catch(error => {
            console.log(error)
            setFeedback(`Failed to save lineup: ${error}`);
        });
    };

    return (
        <div>
            <h2>Edit Lineup</h2>
            <div className="lineup-name-input">
                <label>
                    Lineup Name: 
                    <input type="text" value={lineupName} onChange={e => setLineupName(e.target.value)} />
                </label>
            </div>
            <div className="lineup-total-salary">
                <p>Total Salary: {totalSalary}</p>
            </div>
            <div className="player-picker">
                <h3>Player Picker</h3>
                {players.map((player, index) => 
                    <div key={index}>
                        <p>{player.name} - {player.team} - {player.position}</p>
                        <button onClick={() => handlePlayerChange(player)}>Add to Lineup</button>
                    </div>
                )}
            </div>
            <div className="current-lineup">
                <h3>Current Lineup</h3>
                {Object.entries(lineup).map(([role, player], index) => 
                    <div key={index}>
                        <p>{role}: {player.name} - {player.team} - {player.position}</p>
                        <button onClick={() => handleRemovePlayer(role)}>Remove from Lineup</button>
                    </div>
                )}
            </div>
            <button onClick={handleSaveLineup}>Save Lineup</button>
            <div className="feedback">
                <p>{feedback}</p>
            </div>
        </div>
    );
};

export default EditLineupBuilder