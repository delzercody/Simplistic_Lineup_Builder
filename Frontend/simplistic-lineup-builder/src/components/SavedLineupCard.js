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
    
        return (
            <div>
                <h2>{lineup.name}</h2>
                <p>Players: {playerNames}</p>
                <button onClick={handleDelete}>Delete</button>
                <button onClick={() => navigate(`/lineups/edit/${lineup.id}`)}>Edit</button>
            </div>
        );
    }
    
    export default SavedLineupCard
