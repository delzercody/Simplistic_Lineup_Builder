// ViewSavedLineupsPage.js

import React from 'react';
import SavedLineupList from './SavedLineupList';

function ViewSavedLineupsPage() {
    return (
        <div>
            <h1>The Page to go to view your saved lineups. From here you can delete a lineup. View them. or take yourself to the edit page via a button on the lineup card.</h1>
            <SavedLineupList />
        </div>
    );
}

export default ViewSavedLineupsPage;
