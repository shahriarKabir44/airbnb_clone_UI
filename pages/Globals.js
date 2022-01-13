import CurrentUserService from "./services/CurrentUserService"

class Globals {

   static SERVER_URL = "http://localhost:3000/"
   static getAllHousesPath = "/api/general/getAllHouses/"
   static getHousePath = "/api/general/getHouse/"
   static loginPath = '/api/unauthorized/login'
   static registerPath = '/api/unauthorized/register'
   static checkAuthorizeization = '/api/unauthorized/isAuthorized'
   static reserveRoomURL='/api/Authorized/Booking/CreateBooking'
   static isReservedURL='/api/Authorized/Booking/IsReserved'
   static cancelReservationURL='/api/Authorized/Booking/CancelReservation'
	static getReservationList='/api/Authorized/Booking/GetBookingList'

   static async httpRequest(path, body = null, isAuthorizationNeeded=false) {
      if(isAuthorizationNeeded && !localStorage.getItem('token')){
         CurrentUserService.setCurrentUser(null)
         AuthService.setAuthorizedStat(false)
         return {data: null}
      }
      var data = {
         method: body ? 'POST' : 'GET',
         headers: {
            'Content-Type': 'application/json',
            'authorization': `bearer ${localStorage.getItem('token')}`
         }

      }
      if (body) data.body = JSON.stringify(body)
      var { data } = await fetch(this.SERVER_URL + path, data).then(res => res.json())
      return data
   }
}

export default Globals