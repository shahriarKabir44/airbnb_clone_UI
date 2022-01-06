import Header from "./Header";
import { useEffect, useState } from "react";
import ModalToggleService from "../../services/ModalToggleService";
import Modal from "./Modal";
import Login from "../Unauthorized/Login";
import Signup from "../Unauthorized/Signup";
function Layout({ content }) {
    const [modalStatus, setModalStatus] = useState(0)
    const [modalType, toggleModalType] = useState(1)
    useEffect(() => {
        ModalToggleService.getState().subscribe(({ state }) => {
            setModalStatus(state)
        })
    }, [])
    return (
        <div>
            <Header />
            {modalStatus !== 0 && <Modal toggleModalState={setModalStatus}  >
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
        </div>
    );
}

export default Layout;