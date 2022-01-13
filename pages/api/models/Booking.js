import House from './House'
class Booking{
    static bookings=[{
        locationId:0,
            startDate:(new Date())*1,
            endDate:(new Date())*1+24*3600*3 ,
            userId:0,
            Id: 0,
            status:1,
            cost:3000
    },{
        locationId:1,
            startDate:(new Date())*1,
            endDate:(new Date())*1+24*3600*3 ,
            userId:0,
            Id: 0,
            status:1,
            cost:3000
    }]
    static getBookingList({userId}){
        let res=[]
        this.bookings.forEach(booking=>{
            if(booking.userId==userId){
                booking['Place']=House.findOne(booking.locationId)
            }
            res.push(booking)
         })
         return res
    }
    static isReserved({userId, location}){
        for(let booking of this.bookings){
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
            Id: this.bookings.length,
            status:1,
            cost:cost
        }
        this.bookings.push(newBooking)
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
        for(let booking in this.bookings){
            if(booking.Id==bookingId){
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