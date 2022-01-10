import Head from "next/head";
import DateRangePicker from "../../components/DateRangePicker";
import Layout from "../../components/Shared/Layout";
import { useEffect, useState } from "react";
import ModalToggleService from "../services/ModalToggleService";
import CurrentUserService from "../services/CurrentUserService";
import AuthService from "../services/AuthService";
import Globals from "../Globals";
import Modal from "../../components/Shared/Modal";
function House({ house }) {
    const [stayDuration, setStayDuration] = useState(1)
    const [isAuthorized, setAuthorizedStat] = useState(false)
    const [currentuser, setCurrentuser] = useState(null)
    const [startDate, setStartdate] = useState(new Date())
    const [endDate, setEndDate] = useState(new Date())
    const [canShowReservation, toggleReservation] = useState(0)
    const [reservationStatmessage, setReservationStatMessage] = useState('')
    const [reservationStatus, setReservationStaus] = useState({
        isBooked: false,
        data: null
    })
    const [canShowReservationStatModal, toggleReservatonStatModalVisibility] = useState(false)

    var { id, picture, type, town, title, description, guests, price } = house
    useEffect(() => {

        AuthService.isAuthorized().subscribe(({ state }) => {
            if (state) {
                CurrentUserService.getCurrentUser().subscribe(({ currentUser }) => {
                    if (currentUser) {
                        console.log("user", state, currentUser);
                        setCurrentuser(currentUser)
                        setAuthorizedStat(true)
                        Globals.httpRequest(Globals.isReservedURL, {
                            userId: currentUser.id, location: id
                        })
                            .then(reservationStatus => {
                                console.log("reservation", reservationStatus)
                                setReservationStaus(reservationStatus)
                            })
                    }

                })
            }
        })
    }, [isAuthorized])
    async function cancelReservation() {

    }
    async function bookRoom() {
        if (!isAuthorized) {
            ModalToggleService.setState(1)
            return
        }
        let data = {
            locationId: id,
            startDate: startDate * 1,
            enddate: endDate * 1,
            userId: currentuser.id,
        }
        let response = await Globals.httpRequest(Globals.reserveRoomURL, data)
        console.log(response);
        if (!response.success) {
            toggleReservation(2)
            setReservationStatMessage(response.message)
            toggleReservatonStatModalVisibility(true)
        }
        else {
            toggleReservation(1)
            setReservationStatMessage("Room reserved successfully!")
            toggleReservatonStatModalVisibility(true)
            setReservationStaus(true)
        }
    }
    return (
        <Layout content={
            <div>
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
                        <DateRangePicker setBeginDate={setStartdate} setLastdate={setEndDate} setStayDuration={setStayDuration} />
                        <div>
                            <h2>Price per night</h2>
                            <p>${price}</p>
                            <h2>Duration:</h2>
                            <p>{stayDuration} Day(s)</p>
                            <h2>Total price for booking</h2>
                            <p>${(stayDuration * price).toFixed(2)}</p>
                            <button className="reserve" onClick={() => { bookRoom() }} > Reserve </button>
                        </div>
                    </aside>
                </div>
                {canShowReservationStatModal && <Modal toggleModalState={toggleReservatonStatModalVisibility} >
                    {reservationStatmessage}
                </Modal>}
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
    var { data } = await fetch(`http://localhost:3000/api/general/getHouse/${id}`).then(res => res.json())
    return {
        props: { house: data }
    }
}
export default House;