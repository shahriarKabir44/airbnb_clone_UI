

function Modal({ children, toggleModalState }) {
    return (
        <div className="nav-container">
            <div className="modal-background" onClick={() => toggleModalState(false)}>

            </div>
            <div className="modal-body">
                {children}
            </div>
            <style jsx>
                {`
                .modal-background    {
                        position: fixed;
                        top: 0;
                        left: 0;
                        background: rgba(0,0,0,.4);
                        height: 100vh;
                        width: 100vw;
                        z-index:100;
                    }
                    .modal-body{
                        width: 50vw;
                        height: auto;
                         padding: 2em;
                        background: white;
                        top: 50%;
                        left: 50%;
                        transform: translate(-50%, -50%);
                        position: fixed;
                        border-radius: 10px;
                        box-shadow: 5px 5px 5px 5px rgb(0 0 0 / 50%);
                        z-index:200;
                    }
            `    }
            </style>
        </div>
    );
}

export default Modal;