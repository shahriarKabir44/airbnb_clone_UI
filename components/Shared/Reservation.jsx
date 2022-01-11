import React from 'react';
import DateRangePicker from '../DateRangePicker';
import { useState, useEffect } from 'react';
import Globals from '../../pages/Globals';
import Modal from './Modal'
import CurrentUserService from '../../pages/services/CurrentUserService';
import ModalToggleService from '../../pages/services/ModalToggleService';



function Reservation({ house }) {
    const [stayDuration, setStayDuration] = useState(1)
    const [startDate, setStartdate] = useState(new Date())
    const [endDate, setEndDate] = useState(new Date())
    const [canShowReservationButton, toggleReservationButton] = useState(true)
    const [reservationStatmessage, setReservationStatMessage] = useState('')
    const [reservationStatus, setReservationStaus] = useState({
        isBooked: false,
        data: null
    })
    const [user, setCureentUser] = useState(null)

    const [canShowReservationModal, setReservationModalVisibility] = useState(0)

    const [canShowReservationStatModal, toggleReservatonStatModalVisibility] = useState(false)
    useEffect(() => {
        CurrentUserService.getCurrentUser().subscribe(({ currentUser }) => {
            setCureentUser(currentUser)
            if (currentUser) {
                Globals.httpRequest(Globals.isReservedURL, {
                    userId: currentUser.Id, location: house.Id
                })
                    .then(reservationStatus => {
                        setReservationStaus(reservationStatus)
                        toggleReservationButton(!reservationStatus.isBooked)
                    })
            }
        })


    }, [])
    async function bookRoom() {
        if (!user) {
            ModalToggleService.setState(1)
            return
        }
        let data = {
            locationId: house.Id,
            startDate: startDate * 1,
            enddate: endDate * 1,
            userId: user.Id,
        }
        let response = await Globals.httpRequest(Globals.reserveRoomURL, data)
        if (!response.success) {
            toggleReservationButton(true)
            setReservationStatMessage(response.message)
            toggleReservatonStatModalVisibility(1)
        }
        else {

            setReservationStatMessage("Room reserved successfully!")
            setReservationStaus(response.data)
            toggleReservatonStatModalVisibility(1)
            toggleReservationButton(false)

        }
    }
    return (
        <div>
            {user && <Modal setModalStatus={setReservationModalVisibility} modalStatus={canShowReservationStatModal}>
                <h2> {reservationStatmessage} </h2>
            </Modal>}
            <DateRangePicker setBeginDate={setStartdate} setLastdate={setEndDate} setStayDuration={setStayDuration} />
            <div>
                <h2>Price per night</h2>
                <p>${house.price}</p>
                <h2>Duration:</h2>
                <p>{stayDuration} Day(s)</p>
                <h2>Total price for booking</h2>
                <p>${(stayDuration * house.price).toFixed(2)}</p>
                {canShowReservationButton && <button className="reserve" onClick={() => { bookRoom() }} > Reserve </button>}
                {!canShowReservationButton && <button className="reserve" onClick={() => { }} > Cancel reservation </button>}

            </div>
            <style jsx> {`
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
            `} </style>
        </div>
    );
}

export default Reservation;