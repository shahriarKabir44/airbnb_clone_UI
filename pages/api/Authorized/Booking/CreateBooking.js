import Booking from "../../models/Booking"
export default function login(req, res) {
     res.send({data:Booking.createBooking(req.body)})

}