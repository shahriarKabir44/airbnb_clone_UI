import { Subject } from 'rxjs'

const reservationModalStatus  = new Subject(false)
const ReservationModalService = {
    getreservationModalStatus: () => reservationModalStatus.asObservable(),
    setreservationModalStatus: state => reservationModalStatus.next({ reservationModalStatus: state })
}
export default ReservationModalService