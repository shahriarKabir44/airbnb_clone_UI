import Booking from "../../models/Booking"
import verifyAuthToken from '../../unauthorized/jwtHandler'
function CancelReservation(req, res) {
     res.send({data:Booking.cancelBooking(req.body)})
}

export default verifyAuthToken(CancelReservation)