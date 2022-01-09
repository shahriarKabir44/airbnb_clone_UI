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
    static isReserved({userId, location}){
        for(let booking of bookings){
            if(booking.userid==userId && booking.locationId==location && booking.enddate>=(new Date())*1){
                return true
            }
        }
        return false
    }
    static createBooking({locationId,startDate,enddate,userid }){
        if(this.isReserved({userId:userid,location:locationId})){
            return {
                success: 0,
                message:"Room already booked!"
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