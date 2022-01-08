import houses from '../mock_db/houses'
class House{
    static getAll(){
        return houses
    }
    static findOne(Id){
        houses.filter(house => house.id == Id)[0]
    }
}
export default House