// Dashboard.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
    const navigate = useNavigate()
    return (
        <div>
            <h1 style = {{marginTop: '40px'}}>Welcome to the Daily Fantasy Football Lineup Builder</h1>

            <div className="dashboard-links" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 10%', marginTop: '60px' }}>
    <div class="card" style={{ width: '18rem', height: '12rem', backgroundColor: '#00CED1' }}>
        <div class="card-body">
            <h5 class="card-title">View All Players</h5>
            <p class="card-text">Access a list of all the players.</p>
            <button className="btn btn-dark btn-block mb-4" onClick={() => navigate('/players')}>Go to Players</button>
        </div>
    </div>
    
    <div class="card" style={{ width: '18rem', height: '12rem', backgroundColor: '#FFD700' }}>
        <div class="card-body">
            <h5 class="card-title">Build a Lineup</h5>
            <p class="card-text">Create your own lineup from the players.</p>
            <button className="btn btn-dark btn-block mb-4" onClick={() => navigate('/buildlineup')}>Start Building</button>
        </div>
    </div>
    
    <div class="card" style={{ width: '18rem', height: '12rem', backgroundColor: '#FFC0CB' }}>
        <div class="card-body">
            <h5 class="card-title">View Saved Lineups</h5>
            <p class="card-text">Check out the lineups you've saved.</p>
            <button className="btn btn-dark btn-block mb-4" onClick={() => navigate('/viewsavedlineups')}>View Lineups</button>
        </div>
    </div>
    
    <div class="card" style={{ width: '18rem', height: '12rem', backgroundColor: '#00BFFF' }}>
        <div class="card-body">
            <h5 class="card-title">View User Profile</h5>
            <p class="card-text">Take a look at your profile information.</p>
            <button className="btn btn-dark btn-block mb-4" onClick={() => navigate('/userprofile')}>Go to Profile</button>
        </div>
    </div>
</div>
        </div>
    );
}

export default Dashboard