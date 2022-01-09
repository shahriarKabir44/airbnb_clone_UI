import Link from "next/link";
import { useState, useEffect } from "react";
import ModalToggleService from '../../pages/services/ModalToggleService'
import AuthService from "../../pages/services/AuthService";
import CurrentUserService from "../../pages/services/CurrentUserService";
function Header() {
    const [isAuthorized, setAuthorizedStat] = useState(false)
    useEffect(() => {
        AuthService.isAuthorized().subscribe(({ state }) => {
            setAuthorizedStat(state)
        })
    }, [])

    function logout() {
        localStorage.clear()
        AuthService.setAuthorizedStat(false)
        CurrentUserService.setCurrentUser(null)
    }

    return (
        <div className="nav-container">
            <Link href="/">
                <a href="#">
                    <img className="nav_item" src="/img/airbnb_logo.png" height='100%' alt="" />
                </a>
            </Link>
            <nav>

                {!isAuthorized && <ul className="nav_ul">
                    <li className="nav_item" onClick={(e) => { e.preventDefault(); ModalToggleService.setState(1) }}>
                        <Link href='#'  > Log in </Link>
                    </li>
                    <li className="nav_item" onClick={(e) => { e.preventDefault(); ModalToggleService.setState(2) }}>
                        <Link href='#' > Sign up </Link>
                    </li>
                </ul>}
                {isAuthorized && <ul className="nav_ul">
                    <li className="nav_item" >
                        <Link href='#'>Bookings </Link>
                    </li>
                    <li className="nav_item" onClick={() => { logout() }} >
                        <Link href='#'>Logout </Link>
                    </li>
                </ul>}
            </nav>
            <style jsx>
                {
                    `
                    .nav-container{
                        display: flex;
                        justify-content: space-between;
                        border-bottom: 1px solid #eee;
                    }
                    .nav_ul{
                        list-style : none;
                        display: flex;
                    }
                    .nav_item{
                        padding: .7em .5em
                    }
                    `
                }
            </style>
        </div>
    );
}

export default Header;