import { useEffect, useState } from "react";

function Modal({ children, setModalStatus, modalStatus }) {
    const [status, setStatus] = useState(0)
    const [visibility, setVisibility] = useState(0)
    useEffect(() => {
        if (modalStatus != status) toggle(modalStatus)
    }, [modalStatus])
    function toggle(type) {
        setStatus(type)
        setTimeout(() => {
            setModalStatus(type)
            setVisibility(type)
        }, 200)
        // toggleModalState(0)

    }
    return (
        <div className={`nav-container ${visibility ? "displayBlock" : "displayNone"} `}>
            <div className="modal-background" onClick={() => toggle(0)}>

            </div>
            <div className={` modal-body  ${status ? "fall" : "climb"} `} >
                {children}
            </div>
            <style jsx="true">
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
                    z-index:1000;
                    
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
                  .displayNone{
                      display:none
                  }
                  .displayBlock{
                      display:block
                  }
                
            `    }
            </style>
        </div>
    );
}

export default Modal;