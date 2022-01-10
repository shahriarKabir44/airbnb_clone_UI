import { useEffect, useState } from "react";
import StaticPageLayout from "../../components/Shared/StaticPageLayout";
import Head from "next/head";
import CurrentHouseService from "../services/CurrentHouseService";
function House({ house }) {

    var { Id, picture, type, town, title, description, guests, price } = house
    useEffect(() => {
        CurrentHouseService.setcurrentHouse(house)
    })


    return (
        <StaticPageLayout content={
            <div>
                <div className="container">
                    <article>
                        <Head>
                            <title> {title} </title>
                        </Head>
                        <p>
                            {type} - {town}
                        </p>
                        <p>{description}</p>
                        <p>{guests}</p>
                    </article>
                </div>
            </div>} />

    );
}
export async function getServerSideProps({ query }) {
    const { Id } = query
    var { data } = await fetch(`http://localhost:3000/api/general/getHouse/${Id}`).then(res => res.json())
    return {
        props: { house: data }
    }
}
export default House;