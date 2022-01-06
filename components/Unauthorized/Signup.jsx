import React from 'react';
import Globals from '../../pages/Globals'
import CurrentUserService from '../../services/CurrentUserService'
function Signup({ toggleModalType }) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    async function register(e) {
        e.preventDefault()
        var data = {
            password: password,
            email: email
        }
        var payload = await Globals.httpRequest(Globals.registerPath, data)
        if (!payload) localStorage.clear()
        else {
            localStorage.setItem('token', payload.token)
            CurrentUserService.setCurrentUser(payload.user)
        }
    }
    return (
        <div>
            <h2>Sign up</h2>
            <div>
                <form onSubmit={(e) => { register(e) }}>
                    <input onChange={(e) => { setEmail(e.target.value) }} className='unauthorizedActionForm' id="email" type="email" placeholder="Email address" />
                    <input onChange={(e) => { setPassword(e.target.value) }} className='unauthorizedActionForm' id="password" type="password" placeholder="Password" />
                    <input className='unauthorizedActionForm'
                        id="passwordconfirmation"
                        type="password"
                        placeholder="Enter password again"
                    />
                    <button className='formActionBtn' >Sign up</button>
                </form>
            </div>
            <hr />
            <b>Already have an account? <u onClick={() => { toggleModalType(1) }} >Log in</u> </b>

        </div>
    );
}

export default Signup;