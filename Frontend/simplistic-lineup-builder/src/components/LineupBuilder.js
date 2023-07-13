//LineupBuilder.js

import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom'
import UserContext from '../UserContext';

const LineupBuilder = ({ players }) => {
    const { user } = useContext(UserContext)
    const initialLineup = {
        QB: null,
        RB1: null,
        RB2: null,
        WR1: null,
        WR2: null,
        WR3: null,
        TE: null,
        DEF: null
    };

    const [lineup, setLineup] = useState(initialLineup)
    const [lineupName, setLineupName] = useState('')
    const [totalSalary, setTotalSalary] = useState(0)
    const [feedback, setFeedback] = useState('')

    const addPlayerToLineup = (player) => {
        console.log("Adding player:", player)
        if (totalSalary + player.salary > 50000) {
            alert('Total salary cannot exceed $50,000');
            return;
        }

        // Find first null slot for this position
        const slot = Object.entries(lineup).find(([pos, pl]) => {
            if (pos === 'QB' && player.position === 'QB') return !pl;
            if (pos.startsWith('RB') && player.position === 'RB') return !pl;
            if (pos.startsWith('WR') && player.position === 'WR') return !pl;
            if (pos === 'TE' && player.position === 'TE') return !pl;
            if (pos === 'DEF' && player.position === 'DEF') return !pl;
            return false;
            });
            console.log("Slot found:", slot)

        if (slot) {
            setLineup(prevLineup => ({
                ...prevLineup,
                [slot[0]]: player
            }));
            setTotalSalary(prevSalary => prevSalary + player.salary);
        } else {
            alert(`You can't add more than the allowed number of players for position ${player.position}`);
        }
    };

    const removePlayerFromLineup = (position) => {
        const player = lineup[position];
        setLineup(prevLineup => ({
            ...prevLineup,
            [position]: null
        }));
        setTotalSalary(prevSalary => prevSalary - player.salary);
    }

    const handleSaveLineup = () => {
        // Check if lineup has required number of players
        if (Object.values(lineup).some(player => player === null)) {
            setFeedback('Lineup must contain exactly 1 QB, 2 RBs, 3 WRs, 1 TE, and 1 DEF.');
            return;
        }
    
        // Prepare data to be sent to server
        const lineupData = {
            name: lineupName,
            user_id: user.id, // Get userId from user context
            lineup_slots: Object.entries(lineup).map(([role, player]) => ({player_id: player.id, role})) // Change here
        }
        console.log("Lineup data to be sent:", lineupData)
    
        fetch('http://localhost:5555/api/lineups/', {
            method: 'POST',
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
    }

        return (
            <div>
                <h2>Lineup Builder</h2>
                <label>
                    Lineup Name: 
                    <input type="text" value={lineupName} onChange={e => setLineupName(e.target.value)} />
                </label>
                <p>{feedback}</p>
                <h2>Current Lineup</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Position</th>
                            <th>Name</th>
                            <th>Team</th>
                            <th>Salary</th>
                            <th>Projected Points</th>
                            <th>Ownership Percentage</th>
                            <th>Next Game</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {Object.entries(lineup).map(([position, player]) => (
                            <tr key={position}>
                                <td>{position}</td>
                                {player ? (
                                    <>
                                        <td>{player.name}</td>
                                        <td>{player.team}</td>
                                        <td>{player.salary}</td>
                                        <td>{player.projected_points}</td>
                                        <td>{player.ownership_percentage}</td>
                                        <td>{player.team_game}</td>
                                        <td><button onClick={() => removePlayerFromLineup(position)}>Remove</button></td>
                                    </>
                                ) : (
                                    <td colSpan="7">Empty</td>
                                )}
                            </tr>
                        ))}
                    </tbody>
                </table>
                <p>Total Salary: {totalSalary}</p>
                <button onClick={handleSaveLineup}>Save Lineup</button>
            <table>
                <thead>
                    <tr>
                        <th>Position</th>
                        <th>Name</th>
                        <th>Team</th>
                        <th>Salary</th>
                        <th>Projected Points</th>
                        <th>Ownership Percentage</th>
                        <th>Next Game</th>
                        <th></th> {/* Empty header for the button column */}
                    </tr>
                </thead>
                <tbody>
                    {players.map(player => (
                        <tr key={player.id}>
                            <td>{player.position}</td>
                            <td><Link to={`/players/${player.id}`}>{player.name}</Link></td>
                            <td>{player.team}</td>
                            <td>{player.salary}</td>
                            <td>{player.projected_points}</td>
                            <td>{player.ownership_percentage}</td>
                            <td>{player.team_game}</td>
                            <td><button onClick={() => addPlayerToLineup(player)}>Add to Lineup</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
        );
};

export default LineupBuilder