import Booking from "../../models/Booking"
export default function IsReserved(req, res) {
     res.send({data:Booking.isReserved(req.body)})
}

