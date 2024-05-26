import React, { useContext, useEffect, useState } from 'react';
import './orderHistory.css';
import { ContextData } from '../../context/contextData';
import axios from 'axios';

const OrderHistory = () => {
    const { decodedToken,email ,getEmail } = useContext(ContextData);
    const [allOrders, setAllOrders] = useState([]);

    const getAllOrdersByEmail = async () => {
        try {
            const { data } = await axios.get(`http://localhost:3000/getAllOrdersByCustomerId/${decodedToken?.email}`);
            console.log();
            setAllOrders(data.allOrders);
        } catch (error) {
            console.error('Error getting orders:', error);
        }
    }
    useEffect(() => {
        getEmail();
    }, []);
    useEffect(() => {
        if(email){
        getAllOrdersByEmail();
    }
    }, [email,allOrders]);


    return (
        <div className="container ordhis">
            <div className="orderHistory mt-5">
                <h2 className="text-center mb-4">Order History</h2>
                <table className="table table-striped table-bordered">
                    <thead className="table-dark" style={{backgroundColor:"#F82B00"}}>
                        <tr>
                            <th>#</th>
                            <th>Medicine Name</th>
                            <th>Quantity</th>
                            <th>Total Price</th>
                            <th>Status</th>
                            <th>Message From Pharmacist</th>
                        </tr>
                    </thead>
                    <tbody>
                        {allOrders.map((order, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>
                                    {order.items.map((medicine, index) => (
                                        <div key={index}>{medicine.name}</div>
                                    ))}
                                </td>
                                <td>
                                    {order.items.map((medicine, index) => (
                                        <div key={index}>{medicine.quantity}</div>
                                    ))}
                                </td>
                                <td>{order.total}</td>
                                <td>{order.status}</td>
                                <td>{order.message}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default OrderHistory;
