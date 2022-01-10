import { Subject } from 'rxjs'

const currentUser = new Subject()
const CurrentUserService = {
    getCurrentUser: () => currentUser.asObservable(),
    setCurrentUser: state => currentUser.next({ currentUser: state })
}
export default CurrentUserService