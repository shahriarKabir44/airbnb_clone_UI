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
    const [reservationStatmessage, setReservationStatMessage] = useState('')
    const [reservationStatus, setReservationStaus] = useState({
        isBooked: false,
        data: null
    })
    const [user, setCureentUser] = useState(null)
    const [canShowConfirmationModal, setConfirmationModalVisibility] = useState(false)
    const [confirmationModalType, setConfirmationModalType] = useState(0)


    const [canShowReservationStatModal, toggleReservatonStatModalVisibility] = useState(false)
    useEffect(() => {
        CurrentUserService.getCurrentUser().subscribe(({ currentUser }) => {
            setCureentUser(currentUser)
            if (currentUser) {
                console.log(currentUser);
                Globals.httpRequest(Globals.isReservedURL, {
                    userId: currentUser._id + '', location: house._id
                })
                    .then(reservationStatus => {
                        console.log(reservationStatus);
                        setReservationStaus(reservationStatus)
                    })
            }
        })


    }, [])
    function getStayDuration(startDay, endDay) {
        return Math.floor((endDay * 1 - startDay * 1) / (24 * 3600 * 1000)) + 1
    }

    async function confirmReservation() {
        let data = {
            locationId: house._id,
            startDate: startDate * 1,
            endDate: endDate * 1,
            userId: user._id,
            cost: stayDuration * house.price
        }
        setConfirmationModalVisibility(false)
        let response = await Globals.httpRequest(Globals.reserveRoomURL, data, true)
        setReservationStaus({
            isBooked: response.success,
            data: response.data
        })

        if (!response.success) {
            setReservationStatMessage(response.message)
            toggleReservatonStatModalVisibility(1)
        }
        else {
            setReservationStatMessage("Room reserved successfully!")
            toggleReservatonStatModalVisibility(1)
        }
    }
    function bookRoom() {
        if (!user) {
            ModalToggleService.setState(1)
            return
        }
        setConfirmationModalType(1)
        setConfirmationModalVisibility(true)
    }

    function cancelReservation() {
        if (!user) {
            ModalToggleService.setState(1)
            return
        }
        setConfirmationModalType(2)
        setConfirmationModalVisibility(true)
    }
    async function confirmCancellation() {
        setConfirmationModalVisibility(false)
        let response = await Globals.httpRequest(Globals.cancelReservationURL, reservationStatus.data, true)
        if (!response.success) {
            setReservationStatMessage(response.message)
            toggleReservatonStatModalVisibility(1)
        }
        else {
            setReservationStaus({
                isBooked: false,
                data: null
            })
            setReservationStatMessage("Reservation cancelled successfully!")
            toggleReservatonStatModalVisibility(1)
        }
    }


    return (
        <div>
            {user && <Modal setModalStatus={toggleReservatonStatModalVisibility} modalStatus={canShowReservationStatModal}>
                <h2> {reservationStatmessage} </h2>
            </Modal>}

            {user && <Modal setModalStatus={setConfirmationModalVisibility} modalStatus={canShowConfirmationModal}>
                {confirmationModalType == 1 && <div style={{ textAlign: "center" }}>
                    <div className="cardBody">
                        <h1> Are you sure? </h1>
                        <div>
                            <h4 className='inlineBlock' > Start Date </h4>
                            <p className='inline'> {new Date(1 * startDate).toDateString()} </p>
                        </div>
                        <div>
                            <h4 className='inlineBlock' > End Date </h4>
                            <p className='inline'> {new Date(1 * endDate).toDateString()} </p>
                        </div>
                        <div>
                            <h4 className='inlineBlock' > Duration: </h4>
                            <p className='inline'> {getStayDuration(1 * startDate, 1 * endDate)} Day(s)</p>
                        </div>
                        <div>
                            <h4 className='inlineBlock' > Cost: </h4>
                            <p className='inline'> ${stayDuration * house.price} Days</p>
                        </div>
                    </div>
                    <div className="buttons">
                        <button className="confirm confirmationbtn" onClick={() => { confirmReservation() }} >Proceed</button>
                        <button className="cancel confirmationbtn" onClick={() => { setConfirmationModalVisibility(false) }} >Cancel</button>
                    </div>

                </div>}

                {reservationStatus.isBooked && confirmationModalType == 2 && <div style={{ textAlign: "center" }}>
                    <div className="cardBody">
                        <h1> Are you sure? </h1>
                        <h2>Your reservation information</h2>
                        <div>
                            <h4 className='inlineBlock' > Start Date </h4>
                            <p className='inline'> {new Date(reservationStatus.data.startDate).toDateString()} </p>
                        </div>
                        <div>
                            <h4 className='inlineBlock' > End Date </h4>
                            <p className='inline'> {new Date(reservationStatus.data.endDate).toDateString()} </p>
                        </div>
                        <div>
                            <h4 className='inlineBlock' > Duration: </h4>
                            <p className='inline'> {getStayDuration(reservationStatus.data.startDate, reservationStatus.data.endDate)} Day(s)</p>
                        </div>
                        <div>
                            <h4 className='inlineBlock' > Cost: </h4>
                            <p className='inline'> ${reservationStatus.data.cost} Days</p>
                        </div>
                    </div>
                    <div className="buttons">
                        <button className="confirm confirmationbtn" onClick={() => { confirmCancellation() }} >Proceed</button>
                        <button className="cancel confirmationbtn" onClick={() => { setConfirmationModalVisibility(false) }} >Cancel</button>
                    </div>

                </div>}


            </Modal>}

            {!reservationStatus.isBooked && <div>

                <DateRangePicker setBeginDate={setStartdate} setLastdate={setEndDate} setStayDuration={setStayDuration} />
                <div>
                    <h2>Duration:</h2>
                    <p>{stayDuration} Day(s)</p>
                    <h2>Total price for booking</h2>
                    <p>${(stayDuration * house.price).toFixed(2)}</p>
                    <button className="reserve" onClick={() => { bookRoom() }} > Reserve </button>

                </div>
            </div>}

            {reservationStatus.isBooked && <div>
                <h2>Your reservation information</h2>
                <div>
                    <h4 className='inlineBlock' > Start Date </h4>
                    <p className='inline'> {new Date(reservationStatus.data.startDate).toDateString()} </p>
                </div>
                <div>
                    <h4 className='inlineBlock' > End Date </h4>
                    <p className='inline'> {new Date(reservationStatus.data.endDate).toDateString()} </p>
                </div>
                <div>
                    <h4 className='inlineBlock' > Duration: </h4>
                    <p className='inline'> {getStayDuration(reservationStatus.data.startDate, reservationStatus.data.endDate)} Day(s)</p>
                </div>
                <div>
                    <h4 className='inlineBlock' > Cost: </h4>
                    <p className='inline'> ${reservationStatus.data.cost} Days</p>
                </div>
                <button className="reserve" onClick={() => { cancelReservation() }} > Cancel reservation </button>

            </div>}
            <style jsx="true"> {`
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
            .cardBody{
                 padding: 0.5em;
             }
            .buttons{
                justify-content: space-between;
                display: flex;
            }
            .confirm{
                background: rgb(58 159 33)
            }
            .cancel{
                background: rgb(239 19 19)
            }
            `} </style>
        </div>
    );
}

export default Reservation;