import React, { useState } from 'react';
import Link from 'next/link';
function ReservationElement({ reservation }) {
    const [canCollapse, toggleCollapse] = useState(false)
    function getStayDuration(startDay, endDay) {
        return Math.floor((endDay * 1 - startDay * 1) / (24 * 3600 * 1000)) + 1
    }

    return (
        <div>
            <div className='accordionRoot' >
                <div className="shortBody">
                    <img className='accordionImg' src={reservation.getLocationInfo.picture} alt="" />
                    <div className="accordionElement">
                        <p> Location: </p>
                        <p> {reservation.getLocationInfo.town} </p>
                    </div>
                    <div className="accordionElement">
                        <p> Duration: </p>
                        <p> {getStayDuration(reservation.startDate, reservation.endDate)} days </p>
                    </div>
                    <div className="accordionElement">
                        {!canCollapse && <button className="accordionbtn expandbtn" onClick={() => {
                            toggleCollapse(true)
                        }} >
                            Expand
                        </button>}
                        {canCollapse && <button className="accordionbtn expandbtn" onClick={() => {
                            toggleCollapse(false)
                        }} >
                            Close
                        </button>}
                    </div>
                </div>
                {canCollapse && <div className="accordion">
                    <div className="accordionElement">
                        <p> Start date: </p>
                        <p> {reservation.startDate} </p>
                    </div>
                    <div className="accordionElement">
                        <p> End date: </p>
                        <p> {reservation.startDate} </p>
                    </div>
                    <div className="accordionElement">
                        <p> Cost: </p>
                        <p> {reservation.cost} </p>
                    </div>
                    <div className="accordionElement">
                        <button className="accordionbtn houseDetailsbtn">
                            <Link href="/houses/[_id]" as={'/houses/' + reservation.locationId}>
                                <a>
                                    Location Details
                                </a>
                            </Link>
                        </button>
                    </div>


                </div>}

            </div>
            <style jsx="true">
                {`
                    
                    .houseDetailsbtn{
                        background: #495042
                    }
                    
                `}
            </style>
        </div>
    );
}

export default ReservationElement;