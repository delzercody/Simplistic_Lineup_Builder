// PlayerStatsPage.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import PlayerCardDetailed from './PlayerCardDetailed';

function PlayerStatsPage() {
    const { id } = useParams();
    const [player, setPlayer] = useState(null);

    useEffect(() => {
        console.log("Fetching player with ID:", id);
    
        fetch(`http://localhost:5555/api/players/${id}`)
        .then(response => {
            console.log("Response:", response);
            return response.json();
        })
        .then(data => {
            console.log("Data:", data);
            setPlayer(data);
        })
        .catch(err => {
            console.error("Error:", err);
        });
    }, [id]);

    return (
        <div>
            {player ? (
                // Display PlayerCardDetailed if player data is loaded
                <PlayerCardDetailed player={player} />
            ) : (
                // Display loading message while waiting for player data
                <div>Loading...</div>
            )}
        </div>
    );
}

export default PlayerStatsPage;

