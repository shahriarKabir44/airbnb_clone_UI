import { Subject } from 'rxjs'

const modalStatus = new Subject()
const ModalToggleService = {
    getState: () => modalStatus.asObservable(),
    setState: state => modalStatus.next({ state: state })
}
export default ModalToggleService