import { useState } from "react";

function Modal({ children, toggleModalState }) {
    const [status, setStatus] = useState(1)
    function toggle() {
        setStatus(status ^ 1)
        setTimeout(() => {

            toggleModalState(0)
        }, 200);
    }
    return (
        <div className="nav-container">
            <div className="modal-background" onClick={() => toggle()}>

            </div>
            <div className={` modal-body  ${status === 1 ? "fall" : "climb"} `} >
                {children}
            </div>
            <style jsx>
                {`
                .modal-background{
                    position: fixed;
                    top: 0;
                    left: 0;
                    background: rgba(0,0,0,.4);
                    height: 100vh;
                    width: 100vw;
                    z-index:100;
                }
                .modal-body{
                    width: calc(100vw - 4em);
                    max-width: 32em;
                    height: auto;
                    padding: 2em;
                    background: white;
                    top:  50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    position: fixed;
                    border-radius: 10px;
                    box-shadow: 5px 5px 5px 5px rgb(0 0 0 / 50%);
                    z-index:200;
                    
                }
                .fall{
                    animation-name: dropDown;
                    animation-duration: .3s;
                }
                .climb{
                    animation-name: dropUp;
                    animation-duration: .3s;
                }
                @keyframes dropUp {
                    from {left: 50%;} 
                    to {left: -50%;}
                  }
                @keyframes dropDown {
                    from {top: -50%;}
                    to {top: 50%;}
                  }
                
            `    }
            </style>
        </div>
    );
}

export default Modal;