import React from 'react';
import HostingDetails from './HostingDetails'
function HostingList({ hostingList }) {
    return (
        <div className='hostingRoot'>
            {hostingList.map((hosting, index) => {
                return (<HostingDetails key={index} hostingInfo={hosting} />)
            })}

            <style jsx="true">
                {`
                    .hostingRoot{

                        display: grid;
                        grid-template-columns: 100%;
                    }
                `}
            </style>
        </div>
    );
}

export default HostingList;