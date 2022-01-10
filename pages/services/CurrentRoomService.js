import { Subject } from 'rxjs'

const CurrentRoom  = new Subject()
const CurrentRoomService = {
    getCurrentUser: () => currentUser.asObservable(),
    setCurrentUser: state => currentUser.next({ CurrentRoom: state })
}
export default CurrentRoomService