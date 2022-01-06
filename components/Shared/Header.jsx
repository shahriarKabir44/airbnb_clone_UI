import Link from "next/link";
import ModalToggleService from "../../services/ModalToggleService";
function Header() {
    return (
        <div className="nav-container">
            <Link href="/">
                <img className="nav_item" src="/img/airbnb_logo.png" height='100%' alt="" />
            </Link>
            <nav>

                <ul className="nav_ul">
                    <li className="nav_item" onClick={(e) => { e.preventDefault(); ModalToggleService.setState(1) }}>
                        <Link href='#'  > Log in </Link>
                    </li>
                    <li className="nav_item" onClick={(e) => { e.preventDefault(); ModalToggleService.setState(2) }}>
                        <Link href='#' > Sign up </Link>
                    </li>
                </ul>
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