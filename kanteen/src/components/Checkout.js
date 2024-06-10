import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import userService from '../services/paymentService';
import '../styles/Checkout.css';

export default function Checkout({ route, navigate }) {
    const location = useLocation();
    const session_id= location.state.session_id;
    // const session_id="session_8zuYU6eTUXL49zUJwMskqx8jLDssXID396k-Le2VyZOC7785xj06GmhlrmzA-OI3ImkLqBb6v753YVxSCRot5resFskcEhSev7-ijPYn5rVH";
    const [selectedOption, setSelectedOption] = useState('cash');
    const [isScriptLoaded, setIsScriptLoaded] = useState(false);
    
    useEffect(() => {
        const initCashfree = () => {
            window.CFSDK = window.Cashfree({
                mode: "sandbox", // sandbox or production
            });
            setIsScriptLoaded(true);
        };

        const checkScriptLoaded = () => {
            if (window.Cashfree) {
                initCashfree();
            } else {
                console.log("Cashfree script not loaded");
            }
        };
        checkScriptLoaded();
    }, []);

    const handleGatewayGen = async () => {
        console.log('Payment session ID:', session_id);
                // Proceed with Cashfree checkout
                if (isScriptLoaded) {
                    window.CFSDK.checkout({
                        paymentSessionId: session_id,
                        // returnUrl:"https://kanteen-ase.netlify.app/orderhistory", //TODO: fix order history navigation / redirect to order details
                        redirectTarget:"_self",
                        // notifyUrl:"https://webhook.site/c8dc726a-4c5f-4866-bd7c-968d31dd70c1"
                    });
                } else {
                    console.log("Cashfree SDK not initialized.");
                }
    };

    const renderContent = () => {
        switch (selectedOption) {
            case 'gateway':
                return (
                    <div className="payment-collect-box">
                        <h2>Online Payment</h2>
                        <ul className='ins-list'>
                            <li>Do not hit back / reload button once you procced to pay</li>
                            <li>Once paid , order can't be cancelled</li>
                            <li>If the payment gets failed, items will be released for others</li>
                            <li>2.4% of transaction fee is applicable</li>
                        </ul>
                        <button 
                            onClick={() => {handleGatewayGen();}}
                            className="checkout-proceed-button"
                            >
                            Proceed to pay
                        </button>
                    </div>
                );
            case 'cash':
                return (
                    <div className="payment-collect-box">
                        <h2>Cash Payment</h2>
                        <ul className='ins-list'>
                            <li>Once you click on proceed, the order status will be pending</li>
                            <li>You'll have 7mins of time to pay at merchant and get the order confirmed</li>
                            <li>If the payment gets failed, items will be released for others</li>
                            <li>No transaction fee is applicable</li>
                        </ul>
                        <button className="checkout-proceed-button">Proceed</button>
                    </div>
                );
            default:
                return null;
        }
    };

    return(
        <div>           
            <div className="checkout-container">
            <div className="payment-options-container">
                <button 
                    onClick={() => {setSelectedOption('gateway');}} 
                    className="payment-option-button"
                    style={{backgroundColor: selectedOption==="upi"?"#6E0A28":""}}>
                    Online
                </button>
                <button 
                    onClick={() => setSelectedOption('cash')}
                    className="payment-option-button"
                    style={{backgroundColor: selectedOption==="cash"?"#6E0A28":""}}>
                    Cash
                </button>
            </div>
            <div className="payment-collect-container">
                {renderContent()}
            </div>
        </div>
        </div>
    )
}