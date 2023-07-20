// SavedLineupCard.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

function SavedLineupCard({ lineup }) {
    const navigate = useNavigate()
    const handleDelete = () => {
        if (window.confirm("Are you sure you want to delete this lineup?")) {
            fetch(`http://localhost:5555/api/lineups/${lineup.id}`, { method: 'DELETE' })
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`HTTP error! status: ${response.status}`);
                    }
                    window.location.reload();
                })
                .catch(e => console.log('There was a problem with your fetch operation: ' + e.message));
            }
        }
    

        let playerNames = "No players";
        if (Array.isArray(lineup.lineup_slots)) {
            playerNames = lineup.lineup_slots.map(slot => slot.player.name).join(', ');
        }

        let playerProjectedPoints = "0";
        if (Array.isArray(lineup.lineup_slots)) {
            playerProjectedPoints = lineup.lineup_slots.map(slot => slot.player.projected_points).join(', ');
        }

        let playerSalary = "0";
        if (Array.isArray(lineup.lineup_slots)) {
            playerSalary = lineup.lineup_slots.map(slot => slot.player.salary).join(', ');
        }

        let playerPosition = "";
        if (Array.isArray(lineup.lineup_slots)) {
            playerPosition = lineup.lineup_slots.map(slot => slot.player.position).join(', ');
        }

        const totalProjectedPoints = lineup.lineup_slots.reduce((total, slot) => total + slot.player.projected_points, 0);
        const totalSalary = lineup.lineup_slots.reduce((total, slot) => total + slot.player.salary, 0);
        const totalOwnership = lineup.lineup_slots.reduce((total, slot) => total + slot.player.ownership_percentage, 0)

        return (
            <div className="dashboard-links" style={{marginTop: '60px'}}>
            <div class="card" style={{width: "100%", backgroundColor: '#FFD700'}}>
                <div class="card-body">
                    <h2 class="card-title">{lineup.name}</h2>
                    <table class="table">
                        <thead>
                            <tr>
                                <th>Player Name</th>
                                <th>Player Position</th>
                            </tr>
                        </thead>
                        <tbody>
                            {lineup.lineup_slots.map(slot => (
                                <tr key={slot.player.name}>
                                    <td>{slot.player.name}</td>
                                    <td>{slot.player.position}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <p>Total Projected Points: {totalProjectedPoints}</p>
                    <p>Total Projected Ownership: {totalOwnership}%</p>
                    <p>Total Salary: {totalSalary}</p>
                    <div style={{display: "flex", justifyContent: "space-between"}}>
                        <button class='btn btn-primary' onClick={handleDelete}>Delete</button>
                        <button class='btn btn-primary' onClick={() => navigate(`/lineups/edit/${lineup.id}`)}>Edit</button>
                    </div>
                </div>
            </div>
            </div>
        );
    }
    
    export default SavedLineupCard
