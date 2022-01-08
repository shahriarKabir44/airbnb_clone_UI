import { Subject } from 'rxjs'

const currentUser = new Subject()
const CurrentUserService = {
    getCurrentUser: () => currentUser.asObservable(),
    setCurrentUser: state => currentUser.next({ state: state })
}
export default CurrentUserService