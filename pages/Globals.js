import CurrentUserService from "./services/CurrentUserService"

class Globals {

   static SERVER_URL = "http://localhost:4000/"
   static getAllHousesPath = "house/general/getAllHouses/"
   static getHousePath = "house/general/getHouse/"
   static loginPath = 'unauthorized/Login'
   static registerPath = 'unauthorized/Register'
   static checkAuthorizeization = 'unauthorized/IsAuthorized'
   static reserveRoomURL='authorized/booking/CreateBooking'
   static isReservedURL='authorized/booking/IsReserved'
   static cancelReservationURL='authorized/booking/CancelReservation'
   static getReservationListURL='graphql/'

   static getReservationListGQL (userId){
      return {
         query:`query{
            User(id:"${userId}"){
              
              getReserved{
                 getLocationInfo{
                  picture
                  town 
                }
                time
                startDate
                endDate
                status
                cost
                locationId
              }
            }
          }`
      }
   }

   static hostHouseURL='authorized/hosting/hostHouse'
   static updateHouseImageURL='authorized/hosting/updateImage'


   static async httpRequest(path, body = null,shouldStringify=true, isAuthorizationNeeded=false) {
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
      if (body){
          data.body = JSON.stringify(body)
          if(!shouldStringify)data.body=body
         }
      var resp= await fetch(this.SERVER_URL + path, data).then(res => res.json())

      return resp.data
   }
}

export default Globals