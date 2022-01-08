import bookings from '../mock_db/bookings'
import House from './House'
class Booking{
    static getBookingList(userId){
        let res=[]
        bookings.forEach(booking=>{
            if(booking.userid==userId){
                booking['place']=House.findOne(booking.locationId)
            }
            res.push(booking)
        })
        return res
    }
    static createBooking(locationId,startDate,enddate,userid ){
        let errors=""
        for(let n=0;n<bookings.length;n++){
            if(bookings[n]==userid){
                if(bookings[n].locationId==locationId){
                    errors="House already booked"
                    return {
                        success: 0,
                        message: errors
                    }
                }
            }
        }
        let newBooking={
            locationId:     locationId,
            startDate:      startDate,
            enddate:       enddate ,
            userid:     userid,
             id: bookings.length
        }
        bookings.push(newBooking)
        return {
            success: 1,
            data:newBooking
        }
    }
}
export default Booking