import { useEffect, useState } from 'react';
import Link from 'next/link';
function ReservationList({ reservationList }) {
    const [reservations, setReservations] = useState([])
    useEffect(() => {
        let temp = reservationList.map(reservation => {
            reservation.isCollapsed = false
            return reservation
        });
        setReservations(temp)
    }, [])
    function getStayDuration(startDay, endDay) {
        return Math.floor((endDay * 1 - startDay * 1) / (24 * 3600 * 1000)) + 1
    }
    return (
        <div className='reservationsRoot'>
            {reservationList.map((reservation, index) => {
                return (<div key={index} className='reservation' >
                    <div className="shortBody">
                        <img className='reservationImg' src={reservation.Place.picture} alt="" />
                        <div className="accordionElement">
                            <p> Location: </p>
                            <p> {reservation.Place.town} </p>
                        </div>
                        <div className="accordionElement">
                            <p> Duration: </p>
                            <p> {getStayDuration(reservation.startDate, reservation.endDate)} days </p>
                        </div>
                        <div className="accordionElement">
                            <button className="accordionbtn expandbtn">
                                Expand
                            </button>
                        </div>
                    </div>
                    <div className="accordion">
                        <div className="accordionElement">
                            <p> Start date: </p>
                            <p> {reservation.Place.town} </p>
                        </div>
                        <div className="accordionElement">
                            <p> End date: </p>
                            <p> {reservation.Place.town} </p>
                        </div>
                        <div className="accordionElement">
                            <p> Cost: </p>
                            <p> {reservation.cost} </p>

                        </div>
                        <div className="accordionElement">
                            <button className="accordionbtn houseDetailsbtn">
                                <Link href="/houses/[Id]" as={'/houses/' + reservation.locationId}>
                                    <a>
                                        Location Details
                                    </a>
                                </Link>
                            </button>
                        </div>


                    </div>
                </div>)
            })}
            <style jsx>
                {`
                    .accordionbtn{
                        top: 50%;
                        position: relative;
                        transform: translateY(-50%);
                        color: white;
                        cursor: pointer;
                        border: none;
                        border-radius: 5px;
                        padding: 0.7em;
                        font-size: 15px;
                        
                    }
                    .houseDetailsbtn{
                        background: #495042
                    }
                    .expandbtn{
                        background: #5cb156;
                    }
                    .reservationsRoot{

                        display: grid;
                        grid-template-columns: 100%;
                    }
                    .reservation{
                        background: #ebebeb;
                        padding: 1em 0em;
                        border: 1px solid;
                        border-radius: 10px;
                        margin: 1em 0em;
                    }
                    .shortBody, .accordion{
                        color: black;
                        display: flex;
                        justify-content: space-around;
                    }
                    .accordionElement{
                        color: black
                    }
                    .reservationImg{
                        height: 90px;
                    }
                    .accordion{

                    }
                `}
            </style>
        </div>
    );
}

export default ReservationList;