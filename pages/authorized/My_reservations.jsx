import React, { useEffect, useState } from 'react';
import Globals from '../Globals'
import CurrentUserService from '../services/CurrentUserService';
import AuthService from '../services/AuthService'
import Layout from '../../components/Shared/Layout'
import StickyModal from './utils/StickyModal'
function My_reservations(props) {
    const [currentUser, setCurrentuser] = useState(null)
    const [reservationList, setReservationList] = useState([])
    useEffect(() => {
        Globals.httpRequest(Globals.checkAuthorizeization)
            .then(data => {
                if (data['unauthorized']) {
                    CurrentUserService.setCurrentUser(null)
                    AuthService.setAuthorizedStat(false)
                    setCurrentuser(null)
                }
                else {
                    CurrentUserService.setCurrentUser(data)
                    AuthService.setAuthorizedStat(true)
                    setCurrentuser(data)

                }
            })
    })
    return (
        <Layout content={<div>
            {!currentUser && <StickyModal />}
            {currentUser && <div>

                <div className="header">
                    <h2>My reservations</h2>
                </div>

            </div>}
        </div>
        } />
    );
}

export default My_reservations;