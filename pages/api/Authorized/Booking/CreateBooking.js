import Booking from "../../models/Booking"
export default function CreateBooking(req, res) {
     res.send({data:Booking.createBooking(req.body)})
}

