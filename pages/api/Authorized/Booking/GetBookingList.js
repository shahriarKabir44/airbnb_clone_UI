import Booking from "../../models/Booking"
import verifyAuthToken from '../../unauthorized/jwtHandler'
function GetBookingList(req, res) {
     res.send({data:Booking.getBookingList(req.body)})
}

export default verifyAuthToken(GetBookingList)
