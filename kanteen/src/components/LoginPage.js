import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/LoginPage.css';
import loginImg from '../images/Login-amico.svg';
import { FaEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";
import { Link } from 'react-router-dom';
import userService from '../services/userService';

export default function LoginPage() {
    const [showPwd, setShowPwd] = useState(false);
    const [checked, SetChecked] = useState(false);
    const [data, setData] = useState({
        userName: '',
        pwd: ''
    })
    const [message, setMessage] = useState('');
    const [sucess, setSucess] = useState(false);
    const [clicked, setClicked] = useState(false);
    const [loginValid, setLoginValid] = useState(false);
    let navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        setClicked(true);
        try{
            const response = await userService.login(data.userName,data.pwd);
            setMessage(response.data.message)
            setSucess(response.data.success)
            if(response.data.success){
                setLoginValid(true);
                setTimeout(() => {
                    navigate('/home')
                }, 2000);
            }
            else{
                setLoginValid(false);
            }
        }catch(err){
            setMessage(err.response.data.message)
            setSucess(err.response.data.success)
        }
    };
    return (
        <div className='login-homepage'>
            <div className="login-login-container">
                <div className="login-image-container">
                    <img
                        src={loginImg}
                        alt="login"
                        width="600px" />
                </div>
                <div className="login-login-form">
                    <div className='login-logintxt'>
                        LOGIN
                    </div>
                    <form className="login-form" onSubmit={handleSubmit} >
                        <div className="login-form-group login-first-input">
                            <label
                                htmlFor="username">
                            </label>
                            <input
                                type="text"
                                name="username"
                                id="username"
                                placeholder="Enter your mobile number or email address"
                                onChange={(e) => setData({ ...data, userName: e.target.value })}
                                value={data.userName}
                                required />
                        </div>
                        <div className="login-form-group login-second-input">
                            <label
                                htmlFor="password">
                            </label>
                            <div className='login-pwd-group'>
                                <input
                                    type={showPwd ? "text" : "password"}
                                    name="password"
                                    id="password"
                                    placeholder="Enter your password"
                                    className="login-second-input"
                                    onChange={(e) => setData({ ...data, pwd: e.target.value })}
                                    value={data.pwd}
                                    required />
                                <span
                                    className="eye-display"
                                    onClick={() => setShowPwd((prev) => !prev)}>
                                    {showPwd
                                        ? (<FaRegEyeSlash title="hide" />)
                                        : (<FaEye title="show" />)
                                    }
                                </span>
                            </div>
                        </div>
                        {clicked &&
                            <div className="login-response">
                                <span
                                    style={{ color: sucess ? "#139a72" : "#ba1717" }}>
                                    {message}
                                </span>
                            </div>
                        }
                        <div className="login-memory">
                            <div className="login-rememberMe">
                                <input
                                    title={checked ? "unMark" : "Mark"}
                                    type="checkbox"
                                    name="remember"
                                    checked={checked}
                                    onChange={() => SetChecked(!checked)}
                                    id="remember" />
                                <label
                                    className='login-rememberLabel'
                                    htmlFor="remember">
                                    Remember me!
                                </label>
                            </div>
                            <div className="login-forgotPwd">
                                <Link
                                    className='login-forgotpwdtxt'
                                    to="forgotpwd">
                                    <span>
                                        Forgot Password ?
                                    </span>
                                </Link>
                            </div>
                        </div>
                        <div className="login-login">
                            <button
                                type="submit"
                                value="submit"
                                className='login-loginBtn'>
                                Login
                            </button>
                        </div>
                        <div className="login-signup">
                            Don't have an account?
                            <Link to="/signupmail"
                                className="login-signupBtn">
                                <span >
                                    Sign up
                                </span>
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
