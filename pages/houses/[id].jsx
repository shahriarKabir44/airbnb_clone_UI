import { useEffect, useState } from "react";
import StaticPageLayout from "../../components/Shared/StaticPageLayout";
import Head from "next/head";
import CurrentHouseService from "../services/CurrentHouseService";
import Globals from "../Globals";
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
                        <div>
                            <h2 className="inlineBlock">Price per night:</h2>
                            <h1 className="inline">${price}</h1>
                        </div>
                        <div>
                            <h3 className="inlineBlock"> House type: </h3>
                            <p className="inline"> {type}</p>

                        </div>
                        <div>
                            <h3 className="inlineBlock">location:</h3>
                            <p className="inline">{town}</p>
                        </div>
                        <div>
                            <h4 className="inlineBlock" >Description: </h4>
                            <p className="inline">{description}</p>
                        </div>

                    </article>
                </div>



            </div>} />

    );
}
export async function getServerSideProps({ query }) {
    const { Id } = query
    var { data } = await fetch(`${Globals.SERVER_URL + Globals.getHousePath}${Id}`).then(res => res.json())
    return {
        props: { house: data }
    }
}
export default House;