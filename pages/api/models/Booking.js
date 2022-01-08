import bookings from '../mock_db/bookings'
import House from './House'
class Booking{
    getBookingList(userId){
        let res=[]
        bookings.forEach(booking=>{
            if(booking.userid==userId){
                booking['place']=House.findOne(booking.locationId)
            }
            res.push(booking)
        })
        return res
    }
    createBooking(locationId,startDate,enddate,userid,totalCost){
        let newBooking={
            locationId:     locationId,
            startDate:      startDate,
            enddate:       enddate ,
            userid:     userid,
            totalCost:      totalCost,
            id: bookings.length
        }
        bookings.push(newBooking)
        return newBooking
    }
}
export default Booking