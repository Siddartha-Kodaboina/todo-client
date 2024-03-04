import React from 'react';
import '../styles/Login.css';
import { signInWithGoogle } from '../services/googleAuthService';

const Login = () => {
  return (
    <div className="login-main">
        <div className="content-wrapper">
            <div className="left-wrapper">
                <div className="left-content-wrapper">
                    <div className="image-wrapper">
                        <img src="./images/login-working-guy.png" alt="Working Kid" />
                    </div>
                    <div className="image-below-text-wrapper">
                        <h2>Get It Done Club</h2>
                        <p>Unleash Your Academic and Professional Success with Get It Done Club's Productivity Excellence Platform</p>
                    </div>
                </div>
            </div>
            <div className="right-wrapper">
                <div className="right-content-wrapper">
                    <div className="logo-title">
                        <h2>Get It Done ✅</h2>
                    </div>
                    <div className="login-form">
                        <div className="user-email">
                            <label htmlFor="">Username or email</label>
                            <input type="text" />
                        </div>
                        <div className="password">
                            <label htmlFor="">Password</label>
                            <input type="password" name="" id="" />
                            <a href="#" id="forgot-password">forgot password</a>
                        </div>
                        <div className="sign-in-button">
                            <button>Sign in</button> 
                        </div>
                        <div className="or">
                            <span class="or-before"></span>
                            <p>or</p>
                            <span class="or-after"></span>
                        </div>
                        <div className="sign-in-with-google">
                            <button onClick={signInWithGoogle}><img src="./images/google-icon.png" alt="Google Logo"  /> {'    '} Sign in with Google</button>
                        </div>
                    </div>
                    <div className="create-account">
                        <a href="#">Are you new? Create an Account</a> {/* Added this line */}
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
}

export default Login;