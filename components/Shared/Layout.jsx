import Header from "./Header";
import { useEffect, useState } from "react";
import ModalToggleService from "../../services/ModalToggleService";
import Modal from "./Modal";
import Login from "../Unauthorized/Login";
import Signup from "./Signup";
function Layout({ content }) {
    const [modalStatus, setModalStatus] = useState(false)
    const [modalType, toggleModalType] = useState(1)
    useEffect(() => {
        ModalToggleService.getState().subscribe(({ state }) => {
            console.log(state);
            setModalStatus(state)
        })
    }, [])
    return (
        <div>
            <Header />
            {modalStatus && <Modal toggleModalState={setModalStatus}  >
                {modalType == 1 && <Login toggleModalType={toggleModalType} />}
                {modalType == 2 && <Signup toggleModalType={toggleModalType} />}
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
        </div>
    );
}

export default Layout;