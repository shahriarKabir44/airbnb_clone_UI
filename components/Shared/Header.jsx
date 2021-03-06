import Link from "next/link";
import { useState, useEffect } from "react";
import ModalToggleService from '../../pages/services/ModalToggleService'
import AuthService from "../../pages/services/AuthService";
import CurrentUserService from "../../pages/services/CurrentUserService";
import Globals from "../../pages/Globals";
function Header() {
    const [isAuthorized, setAuthorizedStat] = useState(false)
    const [isFixed, setNavType] = useState(false)
    useEffect(() => {
        AuthService.isAuthorized().subscribe(({ state }) => {
            setAuthorizedStat(state)
        })

        window.addEventListener('scroll', () => {
            let scrollHeight = window.scrollY
            if (scrollHeight > 100) {
                setNavType(1)
            }
            else {
                setNavType(0)
            }
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
                        <Link href='/authorized/view_reservations/My_reservations' as='/authorized/view_reservations/My_reservations'>Bookings </Link>
                    </li>
                    <li className="nav_item" >
                        <Link href='/authorized/hostHouse/Host' as='/authorized/hostHouse/Host'>Host </Link>
                    </li>
                    <li className="nav_item" >
                        <Link href='/authorized//viewHostings/Hostings' as='/authorized/viewHostings/Hostings'>Hostings </Link>
                    </li>
                    <li className="nav_item" onClick={() => { logout() }} >
                        <Link href='#'>Logout </Link>
                    </li>
                </ul>}
            </nav>
            <style jsx="true">
                {
                    `
                    .nav-container{
                        display: flex;
                        justify-content: space-between;
                        border-bottom: 1px solid #eee;
                        position: fixed;
                        width: 100%;
                        z-index: 100;
                        overflow: hidden;
                        background: white;
                        top: 0;
                        left: 0;
                        padding: 0 1em;
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