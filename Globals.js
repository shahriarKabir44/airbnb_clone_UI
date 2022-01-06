class Globals {

   static SERVER_URL = "http://localhost:3000/"
   static getAllHousesPath = "/api/general/getAllHouses/"
   static getHousePath = "/api/general/getHouse/"
   static async httpRequest(path, body = null) {
      var data = {
         method: body ? 'POST' : 'GET',
         headers: {
            'Content-Type': 'application/json'
         },

      }
      if (body) data.body = JSON.stringify(body)
      return await fetch(this.SERVER_URL + path, data).then(res => res.json())
   }
}

export default Globals