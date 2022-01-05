import Head from "next/head";
import Layout from "../../components/Layout";

function House({ house }) {
    var { id, picture, type, town, title, description, guests } = house
    return (
        <Layout content={<div>
            <img src={picture} width="100%" alt="House picture" />

            <div className="container">
                <Head>
                    <title> {title} </title>
                </Head>
                <article>
                    <p>
                        {type} - {town}
                    </p>
                    <p>{description}</p>
                    <p>{guests}</p>
                </article>
                <aside>xnxx</aside>
            </div>
            <style jsx>{`
            .container{
                display: grid;
                grid-template-columns: 55% 40%;
                grid-gap: 5%
            }
            aside{
                border: 1px solid;
                border-radius: 5px;
                padding: 1em;
                box-shadow: 2px 2px 1px 1px;
            }
            ` }</style>

        </div>} />

    );
}
export async function getServerSideProps({ query }) {
    const { id } = query
    var { house } = await fetch(`http://localhost:3000/api/getHouse/${id}`).then(res => res.json())
    return {
        props: { house: house }
    }
}
export default House;