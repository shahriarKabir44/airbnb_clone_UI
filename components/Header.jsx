
function Header(props) {
    return (
        <div className="nav-container">
            <img src="/img/airbnb_logo.png" alt="" />
            <nav></nav>
            <style jsx>
                {
                    `.nav-container{
                        border-bottom: 1px solid green
                    }`
                }
            </style>
        </div>
    );
}

export default Header;