import bookings from '../mock_db/bookings'
import House from './House'
class Booking{
    static getBookingList(userId){
        let res=[]
        bookings.forEach(booking=>{
            if(booking.userId==userId){
                booking['place']=House.findOne(booking.locationId)
            }
            res.push(booking)
        })
        return res
    }
    static isReserved({userId, location}){
        for(let booking of bookings){
             if(booking.userId==userId && booking.locationId==location && booking.status){
                return {
                    isBooked: true,
                    data: booking
                }
            }
        }
        return {
            isBooked: false,
            data: null
        }
    }
    static createBooking({locationId,startDate,endDate,userId,cost }){
        if(this.isReserved({userId:userId,location:locationId}).isBooked){
            return {
                success: 0,
                message:"Room already booked!"
            }
        }
        let newBooking={
            locationId:locationId,
            startDate:startDate*1,
            endDate:endDate*1 ,
            userId:userId,
            Id: bookings.length,
            status:1,
            cost:cost
        }
        bookings.push(newBooking)
        return {
            success: 1,
            data:newBooking
        }
    }
    static cancelBooking({locationId, userId,bookingId}){
        if(!this.isReserved({userId:userId,location:locationId})){
            return {
                success:0,
                message: "Room is not reserved!"
            }
        }
        for(let booking in bookings){
            if(bookings.Id==bookingId){
                booking.status=0
                break
            }
        }
        return {
            success:1,
            message:"Reservation successfully cancelled!"
        }
    }
}
export default Booking