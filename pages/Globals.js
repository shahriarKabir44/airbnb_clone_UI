class Globals {

   static SERVER_URL = "http://localhost:3000/"
   static getAllHousesPath = "/api/general/getAllHouses/"
   static getHousePath = "/api/general/getHouse/"
   static loginPath = '/api/unauthorized/login'
   static registerPath = '/api/unauthorized/register'

   static checkAuthorizeization = 'api/unauthorized/isAuthorized'
   static async httpRequest(path, body = null) {
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