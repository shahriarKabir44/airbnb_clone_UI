import Header from "./Header";

function Layout({ content }) {
    return (
        <div>
            <Header />
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