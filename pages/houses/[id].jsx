import Head from "next/head";

function House({ house }) {
    var { id, picture, type, town, title, description, guests } = house
    return (
        <div>
            <Head>
                <title> {title} </title>
            </Head>
            <img src={picture} width="100%" alt="House picture" />
            <p>
                {type} - {town}
            </p>
            <p>{description}</p>
            <p>{guests}</p>

        </div>
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