import React from 'react';

function Login({ toggleModalType }) {
    function login(e) {
        e.preventDefault()
    }
    return (
        <div>
            <h2> Log in </h2>
            <div>
                <form onSubmit={(e) => { login(e) }} >
                    <input className='unauthorizedActionForm' id="email" type="email" autoComplete='off' placeholder="Email address" />
                    <input className='unauthorizedActionForm' id="password" type="password" placeholder="Password" />
                    <button className='formActionBtn' >Log in</button>
                </form>
                <hr />
                <b>Don't have an account? <u onClick={() => { toggleModalType(2) }} >Register</u> </b>
            </div>

        </div>
    );
}

export default Login;