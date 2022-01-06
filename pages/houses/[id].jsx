import Head from "next/head";
import DateRangePicker from "../../components/DateRangePicker";
import Layout from "../../components/Shared/Layout";
import { useState } from "react";

import ModalToggleService from "../../services/ModalToggleService";
import Globals from "../../Globals";
function House({ house }) {
    const [stayDuration, setStayDuration] = useState(1)
    const [canShowModal, toggleModalState] = useState(false)
    var { id, picture, type, town, title, description, guests, price } = house
    function bookRoom(id) {
        ModalToggleService.setState(true)
        toggleModalState(true)
    }
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
                <aside>
                    <DateRangePicker setStayDuration={setStayDuration} />
                    <div>
                        <h2>Price per night</h2>
                        <p>${price}</p>
                        <h2>Duration:</h2>
                        <p>{stayDuration} Day(s)</p>
                        <h2>Total price for booking</h2>
                        <p>${(stayDuration * price).toFixed(2)}</p>
                        <button className="reserve" onClick={() => { bookRoom(id) }} > Reserve </button>
                    </div>
                </aside>
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
            .reserve{
                background-color: rgb(255, 90, 95);
                color: white;
                width: 100%;
                cursor: pointer;
                border: none;
                border-radius: 5px;
                padding: 0.7em;
                font-size: 15px;
            }
            ` }</style>

        </div>} />

    );
}
export async function getServerSideProps({ query }) {
    const { id } = query
    var { house } = await fetch(`${Globals.getHousePath}${id}`).then(res => res.json())
    return {
        props: { house: house }
    }
}
export default House;