
import Link from "next/link";

function StickyModal(props) {
    return (
        <div className="nav-container ">
            <div className="modal-background">

            </div>
            <div className="modal-body" >
                <div className="card">
                    <h2>You must log in to access this page</h2>
                </div>
                <div className="buttons">
                    <button className="confirmationbtn" style={{ background: "rgb(27, 195, 195)" }}>
                        <Link href={"/"} as={"/"}> Home </Link>
                    </button>
                </div>
            </div>
            <style jsx>
                {`
                    .buttons{
                        text-align: center;
                    }
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
                `}
            </style>
        </div>
    );
}

export default StickyModal;