import Booking from "../../models/Booking"
import verifyAuthToken from '../../unauthorized/jwtHandler'
function CreateBooking(req, res) {
     res.send({data:Booking.createBooking(req.body)})
}

export default verifyAuthToken(CreateBooking)