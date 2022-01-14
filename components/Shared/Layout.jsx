import Header from "./Header";
import { useEffect, useState } from "react";
import ModalToggleService from "../../pages/services/ModalToggleService";
import Modal from "./Modal";
import Login from "../Unauthorized/Login";
import Signup from "../Unauthorized/Signup";
import Globals from "../../pages/Globals";
import AuthService from "../../pages/services/AuthService";
import CurrentUserService from "../../pages/services/CurrentUserService";
function Layout({ content }) {
    const [modalStatus, setModalStatus] = useState(0)
    const [isAuthorized, setAuthorizedStat] = useState(false)
    useEffect(() => {
        ModalToggleService.getState().subscribe(({ state }) => {
            console.log(state);
            setModalStatus(state)
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
                    setAuthorizedStat(1 == 1)
                }
            })
    }, [])
    return (
        <div>
            <Header />
            {!isAuthorized && <Modal modalStatus={modalStatus} setModalStatus={setModalStatus}  >
                {modalStatus == 1 && <Login toggleModalType={setModalStatus} />}
                {modalStatus == 2 && <Signup toggleModalType={setModalStatus} />}
            </Modal>}
            <main> {content} </main>
            <style jsx>
                {`main {
                    position: relative;
                    background-color:white;
                    max-width: 56em;
                    margin: 0 auto;
                    padding:2em;
                    box-sizing: border-box;
                }`}
            </style>
        </div >
    );
}

export default Layout;