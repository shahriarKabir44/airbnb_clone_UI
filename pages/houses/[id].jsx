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
                        <span>
                            <h2 className="inlineBlock">Price per night:</h2>
                            <h1 className="inline">${price}</h1>
                        </span> <br />
                        <span>
                            <h3 className="inlineBlock"> House type: </h3>
                            <p className="inline"> {type}</p>

                        </span> <br />
                        <span>
                            <h3 className="inlineBlock">location:</h3>
                            <p className="inline">{town}</p>
                        </span><br />
                        <span>
                            <span className="inlineBlock" > <h4>Description: </h4> </span>
                            <p className="inline">{description}</p>
                        </span>

                    </article>
                </div>
                <style jsx>
                    {`
                        .inlineBlock{
                            display: inline-block;
                            padding-right: 1rem;
                        }
                         .inline{
                             display: inline
                         }
                    `}
                </style>
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