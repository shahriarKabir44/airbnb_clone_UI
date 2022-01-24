import Header from "./Header";
import { useEffect, useState } from "react";
import ModalToggleService from "../../pages/services/ModalToggleService";
import Modal from "./Modal";
import Login from "../Unauthorized/Login";
import Signup from "../Unauthorized/Signup";
import AuthService from "../../pages/services/AuthService";
import CurrentHouseService from "../../pages/services/CurrentHouseService";
import Reservation from "./Reservation";
import CurrentUserService from "../../pages/services/CurrentUserService";


function StaticPageLayout({ content }) {

    const [isOwned, setOwnershipStatus] = useState(false)

    const [modalStatus, setModalStatus] = useState(0)
    const [isAuthorized, setAuthorizedStat] = useState(false)
    const [currentHouse, setCurrentHouse] = useState(null)
    useEffect(() => {
        ModalToggleService.getState().subscribe(({ state }) => {
            setModalStatus(state)
        })
        CurrentHouseService.getcurrentHouse().subscribe(({ currentHouse }) => {
            setCurrentHouse(currentHouse)
            CurrentUserService.getCurrentUser().subscribe(({ currentUser }) => {
                setAuthorizedStat(currentUser != null)
                if (currentUser) {
                    if (currentUser._id == currentHouse.ownerId) {
                        setOwnershipStatus(true)
                    }
                }
            })
        })




    }, [currentHouse])
    return (
        <div>
            <Header />
            {!isAuthorized && <Modal modalStatus={modalStatus} setModalStatus={setModalStatus}  >
                {modalStatus == 1 && <Login toggleModalType={setModalStatus} />}
                {modalStatus == 2 && <Signup toggleModalType={setModalStatus} />}
            </Modal>}
            <main>
                <div>
                    {currentHouse && <img src={currentHouse.picture} style={{ width: "100%" }} alt="House picture" />}
                </div>

                <div className="container">
                    {content}
                    <aside>
                        {currentHouse && !isOwned && <Reservation house={currentHouse} />}
                    </aside>
                </div>

            </main>
            <style jsx="true">
                {`main {
                   position: relative;
                   background-color: white;
                   max-width: 56em;
                   
                   margin: 200px auto;
                   padding: 2em;
                   box-sizing: border-box;
                }
                .container{
                    display: grid;
                    grid-template-columns: 55% 40%;
                    grid-gap: 5%;
                    height: auto;
                    align-items: flex-start;
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