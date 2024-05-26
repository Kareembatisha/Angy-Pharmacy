import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import image from "../../assets/doctor2.png";
import "./prescription.css";
import { ContextData } from '../../context/contextData';
import { jwtDecode } from 'jwt-decode';

const Prescription = () => {
    const { decodedToken, email ,getEmail } = useContext(ContextData);
    const [message, setMessage] = useState("");
    const [allMessages, setAllMessages] = useState([]);
    const [messageError, setMessageError] = useState(false);


    const sendMessage = async () => {
        try {
            const userMessage = {
                customerEmail: decodedToken?.email,
                message: message
            };
            const { data } = await axios.post('http://localhost:3000/addPrescription', userMessage);
            console.log(data);
        } catch (error) {
            console.error('Error sending message:', error);
        }
    }

    const getAllMessageByEmail = async () => {
        try {
            const { data } = await axios.get(`http://localhost:3000/getAllPrescriptionsByCustomerEmail/${email}`);
            setAllMessages(data.prescriptions);
        } catch (error) {
            console.error('Error getting messages:', error);
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (message.length < 20) {
            setMessageError(true);
            return;
        }
        sendMessage();
        setMessage("");
        setMessageError(false);
    }

    useEffect(() => {
        getEmail();
    }, []);

    useEffect(() => {
        if (email) {
            getAllMessageByEmail();
        }
    }, [email,allMessages]);

    return (
        <div className="container mt-5 mb-5">
            <div className="row">
                <div className="col-md-8 mt-5">
                    <div className="card shadow">
                        <div className="card-body">
                            <h5 className="card-title text-center mb-4">Contact Us</h5>
                            <div className="mb-4">
                                <span>Doctor Email </span><h5>Mohamed Ehab</h5>
                            </div>
                            <div className="mb-4">
                                <span>Send this Message to </span><h5>{decodedToken?.email}</h5>
                            </div>
                            <ul className="list-unstyled">
                                <li className="text-primary"><i className="fas fa-envelope"></i> Messages </li>
                                <li className="messageBody">Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum earum, iure beatae perferendis temporibus officiis?</li>
                            </ul>
                            <hr />
                            <div className="mb-4 d-flex flex-column justify-content-between align-items-right">
                                <div className="text-end">
                                    <span>User Email </span><h5>{decodedToken?.email}</h5>
                                </div>

                            </div>
                            <ul className="list-unstyled text-end">
                                <li className="text-primary">Sent Message <i className="fas fa-envelope"></i></li>
                                {allMessages.map((message, index) => (
                                    <li key={index} className="messageBody">{message.message}</li>
                                ))}
                            </ul>
                        </div>
                        <hr />
                        <div className="card-body">
                            <h5 className="card-title text-center mb-4">Send Your Message</h5>
                            <form onSubmit={handleSubmit}>

                                <div className="mb-3">
                                    <label htmlFor="email" className="form-label">Your Email</label>
                                    <input type="email" className="form-control" id="email" value={decodedToken?.email} disabled />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="message" className="form-label">Your Message</label>
                                    <textarea className={`form-control ${messageError ? 'is-invalid' : ''}`} id="message" rows="5" minLength="20" required value={message} onChange={(e) => setMessage(e.target.value)}></textarea>
                                    {messageError && <div className="invalid-feedback">Message must be at least 20 characters long.</div>}
                                </div>
                                <div className="text-center">
                                    <button type="submit" className="btn btn-primary" disabled={!message}>Submit</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                <div className="col-md-4 mt-5">
                    <div className="card">
                        <img src={image} className="card-img-top" alt="Contact Us" />
                        <div className="card-body">
                            <h5 className="card-title">Contact Information</h5>
                            <p className="card-text">Email: engy.pharmacy.00@gmail.com</p>
                            <p className="card-text">Phone: 02 35657871</p>
                            <p className="card-text">Address: 13 Alexandria st. , Giza, Egypt</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Prescription;
