import React, { useEffect, useState } from 'react';
import CurrentUserService from '../../services/CurrentUserService'
import StickyModal from '../../../components/Shared/StickyModal'
function Host(props) {
    const [currentUser, setCurrentUser] = useState(null)
    useEffect(() => {
        CurrentUserService.getCurrentUser().subscribe(({ state }) => {
            setCurrentUser(state)
        })
    })
    return (
        <div>
            {!currentUser && <StickyModal />}
        </div>
    );
}

export default Host;