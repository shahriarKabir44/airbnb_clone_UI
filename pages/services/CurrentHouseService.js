import { Subject } from 'rxjs'

const currentHouse  = new Subject()
const CurrentHouseService = {
    getcurrentHouse: () => currentHouse.asObservable(),
    setcurrentHouse: state => currentHouse.next({ currentHouse: state })
}
export default CurrentHouseService