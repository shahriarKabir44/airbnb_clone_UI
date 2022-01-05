import Link from "next/link";
function Header(props) {
    return (
        <div className="nav-container">
            <Link href="/">
                <img className="nav_item" src="/img/airbnb_logo.png" height='100%' alt="" />
            </Link>
            <nav>

                <ul className="nav_ul">
                    <li className="nav_item">
                        <Link href='/login' > Log in </Link>
                    </li>
                    <li className="nav_item">
                        <Link href='/signup' > Sign up </Link>
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
                        padding: 1em .5em
                    }
                    `
                }
            </style>
        </div>
    );
}

export default Header;