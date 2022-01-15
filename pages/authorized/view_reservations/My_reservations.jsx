import React, { useEffect, useState } from 'react';
import Globals from '../../Globals'
import CurrentUserService from '../../services/CurrentUserService';
import AuthService from '../../services/AuthService'
import Layout from '../../../components/Shared/Layout'
import StickyModal from '../../../components/Shared/StickyModal'
import ReservationList from './utils/ReservationList';
function My_reservations(props) {
    const [currentUser, setCurrentuser] = useState(null)
    const [reservationList, setReservationList] = useState(null)
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
                    Globals.httpRequest(Globals.getReservationList, { userId: data._id })
                        .then(data => {
                            setReservationList(data)
                            console.log(data);
                        })
                }
            })
    }, [])
    return (
        <Layout content={<div>
            {!currentUser && <StickyModal />}
            {currentUser && reservationList && <div>

                <div className="header" style={{ textAlign: "center" }}>
                    <h2>My reservations</h2>
                </div>
                <div className="container">
                    <ReservationList reservationList={reservationList} />
                </div>
            </div>}
        </div>
        } />
    );
}

export default My_reservations;