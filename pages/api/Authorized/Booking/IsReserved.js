import Booking from "../../models/Booking"
import verifyAuthToken from '../../unauthorized/jwtHandler'
function IsReserved(req, res) {
     res.send({data:Booking.isReserved(req.body)})
}

export default verifyAuthToken(IsReserved)
