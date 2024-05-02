import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Signupacnt.css';
import { FaEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { useUser } from '../contexts/userContext';

export default function SignUpAcnt(props) {
    const { user } = useUser();
    const emailIdValid = !(user.emailId === '' || user.emailId === null || user.emailId === undefined);
    const [emailDisabled, setEmailDisabled] = useState('');
    const [mobileValid, setMobileValid] = useState(false);
    const [showPwd, setShowPwd] = useState(false);
    const [cnfPwd, setCnfPwd] = useState(false);
    const [pwdValid, setPwdValid] = useState(false);
    const [allValid, setAllValid] = useState(false);
    const [validAll, setValidAll] = useState('');
    const [pwdCheck, setPwdCheck] = useState({
        pwdLength: false,
        pwdUppercase: false,
        pwdLowercase: false,
        pwdNumber: false,
        pwdSpecialChar: false
    });
    const [data, setData] = useState({
        usrname: '',
        mobile: '',
        pwd: '',
        cnfPwd: ''
    })
    useEffect(() => {
        if (pwdCheck.pwdLength && pwdCheck.pwdUppercase && pwdCheck.pwdLowercase && pwdCheck.pwdNumber && pwdCheck.pwdSpecialChar) {
            setPwdValid(true);
        } else {
            setPwdValid(false);
        }
    }, [pwdCheck])
    useEffect(() => {
        if (mobileValid && pwdValid && data.pwd === data.cnfPwd && emailIdValid) {
            setAllValid(true);
        } else {
            setAllValid(false);
        }
    }, [mobileValid, data.cnfPwd, data.pwd, pwdValid, emailIdValid])

    let Navigate = useNavigate();
    const handleEmailClick = async (e) => {
        setEmailDisabled(`You can't change your email id once registered.Signup with a new email id.`);
        setTimeout(() => {
            setEmailDisabled('');
        }, 2500)
    }
    const handleMobileChange = (mobile) => {
        setMobileValid(mobile.match(/^\d{10}$/));
    }
    const handlePasswordChange = (password) => {
        setPwdCheck({
            pwdLength: password.length >= 8,
            pwdUppercase: password.match(/[A-Z]/),
            pwdLowercase: password.match(/[a-z]/),
            pwdNumber: password.match(/[0-9]/),
            pwdSpecialChar: password.match(/[^A-Za-z0-9]/)
        })
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("all ",allValid);
        console.log("mob",mobileValid)
        console.log("pwd", pwdValid ,"pw=",data.pwd, "cnf=",data.cnfPwd, data.pwd === data.cnfPwd ,"em", emailIdValid)
        if (user.emailId === '' || user.emailId === null || user.emailId === undefined) {
            setValidAll(
            <div className='Error-message'>'Please Register with a valid email id first'</div>
           );
            setTimeout(() => {
                Navigate('/signupmail')
            }, 2500)
            return;
        }
        if (!allValid) {
            setValidAll(<div className='Error-message'>'Please fill all the fields correctly'</div>);
            setTimeout(() => {
                setValidAll('');
            }, 3000);
            return;
        }
        if (allValid) {
            alert('Account created successfully');
            Navigate('/login');
        }
    }
    return (
        <div className="signupacnt">
            <div className="signupacnt-signuptxt">Sign up</div>
            <form className="signupacnt-signup-form" onSubmit={handleSubmit}>

                <div className="signupacnt-form-group" onClick={handleEmailClick}>
                    <label
                        htmlFor="userEmail">
                    </label>
                    <input
                        type="text"
                        name="userEmail"
                        id="userEmail"
                        value={user.emailId}
                        disabled
                        required />
                </div>
                {
                    <div className="signupanct-hidden-texts">
                        <div className="signupacnt-check-text">
                            {emailDisabled}
                        </div>
                    </div>
                }
                <div className="signupacnt-form-group">
                    <label
                        htmlFor="mobile">
                    </label>
                    <input
                        type="tel"
                        name="mobile"
                        id="mobile"
                        placeholder={`Enter your mobile number`}
                        value={data.mobile}
                        onChange={
                            (e) => {
                                setData({ ...data, mobile: e.target.value });
                                handleMobileChange(e.target.value)
                            }
                        }
                        required />
                </div>

                {data.mobile.length > 0 && !mobileValid &&
                    <div className="signupanct-hidden-texts">
                        <div className="signupacnt-check-text">
                            <span style={{ color: "red" }} >✖ </span> Enter a valid mobile number
                        </div>
                    </div>
                }

                <div className="signupacnt-form-group">
                    <label
                        htmlFor="pwd">
                    </label>
                    <div className='signupact-pwd-group'>
                        <input
                            type={showPwd ? "text" : "password"}
                            name="password"
                            id="password"
                            placeholder="Enter your password"
                            value={data.pwd}
                            onChange={(e) => {
                                setData({ ...data, pwd: e.target.value });
                                handlePasswordChange(e.target.value)
                            }
                            }
                            required />
                        <span
                            className="eyedisplay"
                            onClick={() => setShowPwd((prev) => !prev)}>
                            {showPwd
                                ? (<FaRegEyeSlash title="hide" />)
                                : (<FaEye title="show" />)
                            }
                        </span>
                    </div>
                </div>
                {data.pwd.length > 0 && !pwdValid &&
                    <div className="signupanct-hidden-texts signupacnt-pwd-check">
                        <div className="signupacnt-check-text">
                            Password must contain atleast:
                        </div>
                        <div className="signupacnt-pwd-check-list">
                            <ul>
                                {
                                    !pwdCheck.pwdLength && !pwdCheck.pwdLength &&
                                    <li>
                                        <span style={{ color: "red" }} >✖ </span>
                                        <span>8 characters</span>
                                    </li>
                                }
                                {
                                    !pwdCheck.pwdUppercase && !pwdCheck.pwdUppercase &&
                                    <li>
                                        <span style={{ color: "red" }} >✖ </span>
                                        <span>1 uppercase letter</span>
                                    </li>
                                }
                                {
                                    !pwdCheck.pwdLowercase && !pwdCheck.pwdLowercase &&
                                    <li>
                                        <span style={{ color: "red" }} >✖ </span>
                                        <span>1 lowercase letter</span>
                                    </li>
                                }
                                {
                                    !pwdCheck.pwdNumber && !pwdCheck.pwdNumber &&
                                    <li>
                                        <span style={{ color: "red" }} >✖ </span>
                                        <span>1 number</span>
                                    </li>
                                }{
                                    !pwdCheck.pwdSpecialChar && !pwdCheck.pwdSpecialChar &&
                                    <li>
                                        <span style={{ color: "red" }} >✖ </span>
                                        <span>1 special character</span>
                                    </li>
                                }
                            </ul>
                        </div>
                    </div>
                }

                <div className="signupacnt-form-group">
                    <label
                        htmlFor="cpwd">
                    </label>
                    <div className='signupact-pwd-group'>
                        <input
                            type={cnfPwd ? "text" : "password"}
                            name="cpwd"
                            id="cpwd"
                            placeholder="Confirm your password"
                            value={data.cnfPwd}
                            disabled={!pwdValid}
                            onChange={(e) => setData({ ...data, cnfPwd: e.target.value })}
                            required />
                        <span
                            className="eyedisplay"
                            onClick={() => setCnfPwd((prev) => !prev)}>
                            {cnfPwd
                                ? (<FaRegEyeSlash title="hide" />)
                                : (<FaEye title="show" />)
                            }
                        </span>
                    </div>
                </div>
                <div className="signupanct-hidden-texts">
                    {pwdValid && data.pwd !== data.cnfPwd && data.cnfPwd.length > 0 &&
                        <div className="signupacnt-check-text">
                            <span style={{ color: "red" }} >✖ </span> Passwords do not match
                        </div>
                    }
                </div>


                <div className="signupacnt-createAcnt">
                    <button
                        type="submit"
                        value="submit"
                        onSubmit={handleSubmit}
                        className='signupacnt-createAcntBtn'>
                        Create Account
                    </button>
                </div>
                <div className="signupanct-hidden-texts">
                    
                        {validAll}
                    
                </div>

            </form>
            <div className="memoryb">
                Already have an account ?
                <Link
                    to="/"
                    className="signupacnt-loginBtn">
                    <span style={{ margin: "2px", }}>
                        Login
                    </span>
                </Link>
            </div>
        </div>
    )
}
