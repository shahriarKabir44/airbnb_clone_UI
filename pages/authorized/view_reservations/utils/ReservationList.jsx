
import Link from 'next/link';
import ReservationElement from './ReservationElement';
function ReservationList({ reservationList }) {
    console.log(reservationList);

    return (
        <div className='reservationsRoot'>
            {reservationList.map((reservation, index) => {
                return (<ReservationElement key={index} reservation={reservation} />)
            })}
            <style jsx>
                {`
                    .reservationsRoot{

                        display: grid;
                        grid-template-columns: 100%;
                    }
                `}
            </style>
        </div>
    );
}

export default ReservationList;