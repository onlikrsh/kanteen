import React,{useState} from 'react'
import {useLocation,useNavigate} from 'react-router-dom';
import '../styles/ForgotOtp.css';
import forgotImg from '../images/ForgotOtp.svg';
import { Link } from 'react-router-dom';

export default function ForgotPwd() {
    const navigate = useNavigate();
    const location = useLocation();
    const [limit,setLimit] = useState(3);
    const state = location.state || {};
    console.log(state.otp);
    const [message,setMessage] = useState('');
    const [data,setData] = useState({
        otp:''
    })
    const handleSubmit = (e) => {
        e.preventDefault();
        if(data.otp === state.otp.toString()){
            setMessage('otp verified successfully redirecting to reset password page');
            setTimeout(() => {
                setMessage('');
                navigate('/resetpwd');
            }, 1500);
        }else{
            setMessage('Oops! OTP not matched. Please try again.You have '+limit+' attempts left');
            setLimit(limit-1);
            if(limit === 0){
                setMessage('You have exceeded the limit. Please try again later');
                setTimeout(() => {
                    setMessage('');
                    navigate('/forgotpwd');
                }, 1500);
            }
            console.log('otp not matched');
        }
    }
    return (
        <div className='forgot-otp-homepage'>
            <div className="forgot-otp-container">
                <div className="forgot-otp-form-container">
                    <div className="forgot-otp-back-container">
                        <Link
                            to="/forgotpwd"
                            className="forgot-otp-backBtn">
                            <span>
                                &lt;
                            </span>
                            Back
                        </Link>
                    </div>
                    <div className="forgot-otp-form">
                        <div className='forgot-otpvertxt'>Verify OTP</div>
                        <p
                            className='forgot-otpauthtxt'>
                            An authentication code has been sent to your email.
                        </p>
                        <p
                                className='forgot-otprestxt'>
                                Didn't receive a code(check Junk box)?
                                <button
                                    type="submit" >
                                    Resend.
                                </button>
                            </p>
                        <form className="forgot-otp-form" onSubmit={handleSubmit}   >
                            <div className="forgot-otp-form-group">
                                <label
                                    htmlFor="username">

                                </label>
                                <input
                                    type="text"
                                    name="forgot-otp"
                                    id="forgot-otp"
                                    value= {data.otp}
                                    onChange ={(e)=>{
                                        setData({otp:e.target.value});
                                        setMessage('');
                                    }}
                                    placeholder="Enter your otp"
                                    required />
                            </div>
                            {
                                message
                            }
                            <div className="forgot-otp">
                                <button
                                    type="submit"
                                    className='forgot-otpBtn'>
                                    Verify
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
                <div className="forgot-otp-image-container">
                    <img
                        src={forgotImg}
                        alt="otp"
                        width="600px" />
                </div>
            </div>
        </div>
    )
}
