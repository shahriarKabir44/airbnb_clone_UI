import Header from "./Header";
import { useEffect, useState } from "react";
import ModalToggleService from "../../pages/services/ModalToggleService";
import Modal from "./Modal";
import CurrentUserService from "../../pages/services/CurrentUserService";
import Login from "../Unauthorized/Login";
import Signup from "../Unauthorized/Signup";
import Globals from "../../pages/Globals";
import AuthService from "../../pages/services/AuthService";
import CurrentHouseService from "../../pages/services/CurrentHouseService";
import Reservation from "./Reservation";


function StaticPageLayout({ content }) {
    const [modalStatus, setModalStatus] = useState(0)
    const [isAuthorized, setAuthorizedStat] = useState(false)
    const [currentHouse, setCurrentHouse] = useState(null)
    const [currentUser, setCureentUser] = useState(null)
    useEffect(() => {
        ModalToggleService.getState().subscribe(({ state }) => {
            setModalStatus(state)
        })
        CurrentHouseService.getcurrentHouse().subscribe(({ currentHouse }) => {
            setCurrentHouse(currentHouse)
        })

        Globals.httpRequest(Globals.checkAuthorizeization)
            .then(data => {

                if (data['unauthorized']) {
                    AuthService.setAuthorizedStat(false)
                    setAuthorizedStat(false)
                    CurrentUserService.setCurrentUser(null)
                }
                else {
                    AuthService.setAuthorizedStat(true)
                    CurrentUserService.setCurrentUser(data)
                    setCureentUser(data)
                    setAuthorizedStat(1 == 1)
                }
            })
    }, [currentHouse])
    return (
        <div>
            <Header />
            {!isAuthorized && modalStatus !== 0 && <Modal toggleModalState={setModalStatus}  >
                {modalStatus == 1 && <Login toggleModalType={setModalStatus} />}
                {modalStatus == 2 && <Signup toggleModalType={setModalStatus} />}
            </Modal>}
            <main>
                <div>
                    {currentHouse && <img src={currentHouse.picture} width="100%" alt="House picture" />}
                </div>

                <div className="container">
                    {content}
                    <aside>
                        {currentHouse && <Reservation house={currentHouse} user={currentUser} />}
                    </aside>
                </div>

            </main>
            <style jsx>
                {`main {
                    position: relative;
                    background-color:white;
                    max-width: 56em;
                    margin: 0 auto;
                    padding:2em;
                    box-sizing: border-box;
                }
                .container{
                    display: grid;
                    grid-template-columns: 55% 40%;
                    grid-gap: 5%
                }
                aside{
                    border: 1px solid;
                    border-radius: 5px;
                    padding: 1em;
                    box-shadow: 2px 2px 1px 1px;
                }
                
                
                `}
            </style>
        </div>
    );
}

export default StaticPageLayout;