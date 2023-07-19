//LineupBuilder.js

import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import UserContext from '../UserContext';


const LineupBuilder = ({ 
    players, 
    initialLineupProp, 
    totalSalary, 
    setTotalSalary, 
    totalPoints, 
    setTotalPoints, 
    totalOwnership, 
    setTotalOwnership, 
    lineupName, 
    setLineupName, 
    isEditMode = false /*default to false */, 
    initialLineupId 
    }) => {

    const navigate = useNavigate()
    const { user } = useContext(UserContext)
    const initialLineup = initialLineupProp || {
        QB: null,
        RB1: null,
        RB2: null,
        WR1: null,
        WR2: null,
        WR3: null,
        TE: null,
        FLEX: null,
        DEF: null
        }

    const [lineup, setLineup] = useState(initialLineup)
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
            if (pos === 'FLEX' && (player.position === 'RB' || player.position === 'WR' || player.position === 'TE')) return !pl;
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
                setTotalPoints(prevPoints => {
                    const newPoints = prevPoints + player.projected_points;
                    return Number(newPoints.toFixed(1));
                });
                setTotalOwnership(prevOwnership => {
                    const newOwnership = prevOwnership + player.ownership_percentage;
                    return Number(newOwnership.toFixed(1));
                })
            } else {
                alert(`You can't add more than the allowed number of players for position ${player.position}`);
            }
        };
        

    // // Event handler for lineup optimization
    // const handleOptimizeLineup = async () => {
    //     const remainingSalaryCap = 50000 - totalSalary;

    //     const lineup_slots = {
    //         'QB': lineup.QB ? null : 'QB',
    //         'RB1': lineup.RB1 ? null : 'RB',
    //         'RB2': lineup.RB2 ? null : 'RB',
    //         'WR1': lineup.WR1 ? null : 'WR',
    //         'WR2': lineup.WR2 ? null : 'WR',
    //         'WR3': lineup.WR3 ? null : 'WR',
    //         'TE': lineup.TE ? null : 'TE',
    //         'FLEX': lineup.FLEX ? null : 'FLEX',
    //         'DEF': lineup.DEF ? null : 'DEF',
    //     }

    //     // Filter out the slots that have already been filled
    //     const empty_slots = Object.entries(lineup_slots).filter(([slot, position]) => position != null);

    //     // Generate the new lineup_slots dictionary
    //     const new_lineup_slots = Object.fromEntries(empty_slots);

    //     // Convert new_lineup_slots into a form suitable for Python code
    //     const positionsNeeded = {};
    //     Object.values(new_lineup_slots).forEach((pos) => {
    //         if (positionsNeeded.hasOwnProperty(pos)) {
    //             positionsNeeded[pos]++;
    //         } else {
    //             positionsNeeded[pos] = 1;
    //         }
    //     });

    //     const availablePlayerNames = players
    //         .filter(player => Object.values(new_lineup_slots).includes(player.position) && player.salary <= remainingSalaryCap)
    //         .map(player => player.name);

    //     // Send request to the back-end optimizer
    //     const response = await fetch('http://localhost:5555/api/optimize', {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json'
    //         },
    //         body: JSON.stringify({ 
    //             availablePlayers: availablePlayerNames, 
    //             lineupRequirements: {
    //                 positionsNeeded, 
    //                 remainingCap: remainingSalaryCap
    //             }
    //         }),
    //     });

    //     const { optimizedPlayers } = await response.json();

    //     optimizedPlayers.forEach(playerName => {
    //         // Find the player object corresponding to playerName
    //         const player = players.find(p => p.name === playerName);

    //         // Add the player to the lineup
    //         if (player) addPlayerToLineup(player);
    //     });
    // };

    const removePlayerFromLineup = (position) => {
        const player = lineup[position];
        setLineup(prevLineup => ({
            ...prevLineup,
            [position]: null
        }));
        setTotalSalary(prevSalary => prevSalary - player.salary);
        setTotalPoints(prevPoints => {
            const newPoints = prevPoints - player.projected_points;
            return Math.abs(newPoints) < 0.00001 ? 0 : Number(newPoints.toFixed(1));
        });
        setTotalOwnership(prevPercentage => {
            const newPercentage = prevPercentage - player.ownership_percentage;
            return Math.abs(newPercentage) < 0.00001 ? 0 : Number(newPercentage.toFixed(1));
        })
    }

    const handleSaveLineup = () => {
        console.log("lineupName:", lineupName);
        console.log("user.id:", user.id);
        console.log("lineup:", lineup)
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
    
        // Use POST for create, PUT for update
    const method = isEditMode ? 'PUT' : 'POST';
    const url = isEditMode ? `http://localhost:5555/api/lineups/${initialLineupId}` : 'http://localhost:5555/api/lineups/';

    fetch(url, {
        method,
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(lineupData)
    })
    .then(response => {
        console.log("Fetch response:", response);
        return response.json();
    })
    .then(data => {
            console.log("Data after fetch:", data)
            setLineup(initialLineup)
            setLineupName('')
            setTotalSalary(0)
            setFeedback('Lineup saved successfully')

            // If in edit mode, navigate back to view saved lineups page
            if (isEditMode) {
                navigate('/viewsavedlineups');
            }
        })
        .catch(error => {
            console.log("Fetch error:", error)
            setFeedback(`Failed to save lineup: ${error}`);
        });
    }

    // Change button text based on mode
        const buttonText = isEditMode ? 'Update Lineup' : 'Save Lineup'

        return (
            <div>
                <h2>Lineup Builder</h2>
                <label>
                    Lineup Name: 
                    <input type="text" value={lineupName} onChange={e => setLineupName(e.target.value)} />
                </label>
                <p>{feedback}</p>
                <h2>Current Lineup</h2>
                <table className="table table-striped table-hover table-bordered container">
                    <thead>
                        <tr>
                            <th>Position</th>
                            <th>Name</th>
                            <th>Team</th>
                            <th>Salary</th>
                            <th>Projected Points</th>
                            <th>Ownership Percentage</th>
                            <th>Next Game</th>
                            <th>Remove From Lineup</th>
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
                                        <td><button class="btn btn-danger" onClick={() => removePlayerFromLineup(position)}>Remove</button></td>
                                    </>
                                ) : (
                                    <td colSpan="7">Empty</td>
                                )}
                            </tr>
                        ))}
                    </tbody>
                </table>
                <p>Total Salary: {totalSalary}</p>
                <p>Total Projected Points: {totalPoints}</p>
                <p>Total Ownership Percentage: {totalOwnership}%</p>
                <button class="btn btn-primary" onClick={handleSaveLineup}>{buttonText}</button>
                {/* <button onClick={handleOptimizeLineup}>Optimize Lineup</button> */}
                <h2>Available Players</h2>
            <table className="table table-striped table-hover table-bordered container">
                <thead>
                    <tr>
                        <th>Position</th>
                        <th>Name</th>
                        <th>Team</th>
                        <th>Salary</th>
                        <th>Projected Points</th>
                        <th>Ownership Percentage</th>
                        <th>Next Game</th>
                        <th>Add to Lineup</th>
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
                            <td><button class="btn btn-success" onClick={() => addPlayerToLineup(player)}>Add to Lineup</button></td>
                            {/* <td>{player.selected ? 
                                <button disabled>Added</button> : 
                                <button onClick={addPlayerToLineup}>Add</button>}
                            </td> */}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
        );
};

export default LineupBuilder