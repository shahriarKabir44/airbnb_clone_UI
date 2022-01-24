import React, { useEffect, useState } from 'react';
import Globals from '../../Globals'
import CurrentUserService from '../../services/CurrentUserService';
import AuthService from '../../services/AuthService'
import Layout from '../../../components/Shared/Layout'
import StickyModal from '../../../components/Shared/StickyModal'
import HostingList from './utils/HostingList';

function Hostings() {
    useEffect(() => {
        const [currentUser, setCurrentuser] = useState(null)
        const [hostingList, setHostingList] = useState([])

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
                    Globals.httpRequest(Globals.graphqlURL, Globals.getHostingsGQL(data._id))
                        .then(data => {
                            console.log(data);
                            setHostingList(data.User.getOwned)
                        })
                        .catch(er => {
                        })
                }
            })
    }, [])
    return (
        <div>
            <Layout content={
                <div>
                    {!currentUser && <StickyModal />}
                    {currentUser && reservationList && <div>

                        <div className="header" style={{ textAlign: "center" }}>
                            <h2>My Hostings</h2>
                        </div>
                        <div className="container">
                            <HostingList hostingList={hostingList} />
                        </div>
                    </div>}
                </div>
            } />


        </div>
    );
}

export default Hostings;