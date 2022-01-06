import React, { useState } from 'react';
import Globals from '../../pages/Globals'
import CurrentUserService from '../../services/CurrentUserService'
function Login({ toggleModalType }) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    async function login(e) {
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
            <h2> Log in </h2>
            <div>
                <form onSubmit={(e) => { login(e) }} >
                    <input required onChange={(e) => { setEmail(e.target.value) }} className='unauthorizedActionForm' id="email" type="email" autoComplete='off' placeholder="Email address" />
                    <input required onChange={(e) => { setPassword(e.target.value) }} className='unauthorizedActionForm' id="password" type="password" placeholder="Password" />
                    <button className='formActionBtn' >Log in</button>
                </form>
                <hr />
                <b>Don't have an account? <u onClick={() => { toggleModalType(2) }} >Register</u> </b>
            </div>

        </div>
    );
}

export default Login;