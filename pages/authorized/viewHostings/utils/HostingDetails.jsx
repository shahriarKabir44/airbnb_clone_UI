import React, { useState } from 'react';
import Link from 'next/link'
function HostingDetails({ hostingInfo }) {
    const [canCollapse, toggleCollapse] = useState(false)
    const [guestList, setGuestList] = useState([])

    function viewGuests() {

    }

    return (
        <div>
            <div className="accordionRoot">
                <div className="shortBody">
                    <img src={hostingInfo.picture} alt="" className="accordionImg" />

                    <div className="accordionElement">
                        <p> Location: </p>
                        <p> {hostingInfo.town} </p>
                    </div>
                    <div className="accordionElement">
                        <p> Type: </p>
                        <p> {hostingInfo.type} </p>
                    </div>
                    <div className="accordionElement">
                        <p> Title: </p>
                        <p> {hostingInfo.title} </p>
                    </div>
                    <div className="accordionElement">
                        <p> Price: </p>
                        <p> ${hostingInfo.price} </p>
                    </div>
                    <div className="accordionElement">
                        {!canCollapse && <button className="accordionbtn expandbtn" onClick={() => {
                            toggleCollapse(true)
                        }} >
                            View Guests
                        </button>}
                        {canCollapse && <button className="accordionbtn expandbtn" onClick={() => {
                            toggleCollapse(false)
                        }} >
                            Close
                        </button>}
                    </div>

                </div>
            </div>
        </div>
    );
}

export default HostingDetails;