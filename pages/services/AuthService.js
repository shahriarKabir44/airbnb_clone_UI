import { Subject } from 'rxjs'

const authorizationStat = new Subject()
const AuthService = {
    isAuthorized: () => authorizationStat.asObservable(),
    setAuthorizedStat: state => authorizationStat.next({ state: state })
}
export default AuthService