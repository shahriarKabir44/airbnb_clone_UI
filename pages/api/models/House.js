import houses from '../mock_db/houses'
class House{
    static getAll(){
        return houses
    }
    static findOne(Id){
        return houses.filter(house => house.id == Id)[0]
    }
}
export default House