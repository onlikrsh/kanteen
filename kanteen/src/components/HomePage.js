import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useUser } from '../contexts/userContext';
import '../styles/HomePage.css';
import foodImg from '../images/food-girl.svg';

export default function HomePage() {
    const { user } = useUser();
    const [message, setMessage] = React.useState('');
    const navigate = useNavigate();
    useEffect(() => {
        if (user.emailId === 'na') {
            setMessage('Please login to continue');
            setTimeout(() => {
                navigate('/login');
            }, 2000);
        }
    }, [user.emailId])
    return (
        <div>

            <div>
                <h1>Welcome to , kanteen</h1>
                {
                    message.length > 0 ? <h2>{message}</h2> :
                        <div className="home-body">
                            <h1>Hello {user.name}</h1> <br />
                            userName: {user.name}<br />
                            emailId : {user.emailId}<br />
                            mobileNumber : {user.mobileNumber}<br />
                        </div>
                }
            </div>

            <div className="homepage-container">
                <div className="foodpage-slogan">
                    <h1>
                        "Good <text-amrita>food</text-amrita> is all the sweeter when shared with good <text-amrita>friends.</text-amrita>"
                    </h1> <br />
                    <text-grey>
                        What are you waiting for? Order now!
                    </text-grey>
                </div>
                <div className="foodpage-image">
                    <img src={foodImg} style={{ width: "250px", height: "250px" }} />
                </div>
            </div>
            <div className="homepage-alerts">
                <h2>Alerts</h2> <br />
                <div className="homepage-alerts-list">
                    <p> &gt; Specials</p> <br />
                    <p> &gt; Status</p> <br />
                </div>
            </div>
            <div className="homepage-buttons">
                <Link exact to="/menu">
                    <button>Order Now </button>
                </Link>
                <Link exact to="/orderhistory">
                    <button>
                        Order History
                    </button>
                </Link>
            </div>
        </div>
    )
}
