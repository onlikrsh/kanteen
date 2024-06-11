import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import OrderItem from './OrderItem'
import ordersImg from '../images/order-history.svg'
import '../styles/OrderHistory.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter } from '@fortawesome/free-solid-svg-icons';

export default function OrderHistory() {
    const navigate = useNavigate()
    const [orders, setOrders] = useState(["hello", "world "])
    return (
        <div className="order-history-page">
            <div className="order-history-img">
                <img src={ordersImg} alt="order-history" />
            </div>
            <div className="order-history-content">
                <div className="order-history-heading">
                    <div className="back-btn">
                        <span title="Go back" className="cart-arrow" onClick={() => {
                            navigate(-1);
                        }}>
                            &lt;
                        </span>
                    </div>
                    <h1>
                        Your Orders
                    </h1>
                    <div className="order-history-filters">
                        <span>Filters</span> <FontAwesomeIcon icon={faFilter} />
                    </div>

                </div>
                <div>
                    {
                        orders.length > 0 ? (
                            <div>
                                <OrderItem />
                                <OrderItem />
                            </div>
                        ) : (
                            <div>
                                <p className="empty-orders">No Orders Found</p>
                            </div>
                        )
                    }
                </div>
            </div>
        </div>
    )
}
