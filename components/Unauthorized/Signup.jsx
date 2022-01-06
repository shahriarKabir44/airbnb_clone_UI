import React from 'react';

function Signup({ toggleModalType }) {
    return (
        <div>
            <h2>Sign up</h2>
            <div>
                <form>
                    <input className='unauthorizedActionForm' id="email" type="email" placeholder="Email address" />
                    <input className='unauthorizedActionForm' id="password" type="password" placeholder="Password" />
                    <input className='unauthorizedActionForm'
                        id="passwordconfirmation"
                        type="password"
                        placeholder="Enter password again"
                    />
                    <button className='formActionBtn' >Sign up</button>
                </form>
            </div>
            <b>Already have an account? <u onClick={() => { toggleModalType(1) }} >Log in</u> </b>

        </div>
    );
}

export default Signup;