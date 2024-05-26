import axios from 'axios';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
const Signup = () => {
    let navigate = useNavigate();

    const register = async (userData) => {
        try {
            const { data } = await axios.post('http://localhost:3000/signup', userData);
            console.log(data);
            if (data.message === 'Customer added') navigate('/login');
        } catch (error) {
            console.error('Error occurred while registering:', error);
        }
    };
    // Yousefahmed  // Yousefahmed@gmail.com  // Test12345

    const registerSchema = Yup.object().shape({
        name: Yup.string().required('Name is required').min(7, 'Must be at least 6 characters').max(20, 'Must be less than 20 characters'),
        email: Yup.string().email('Invalid email').required('Email is required'),
        password: Yup.string().required('Password is required').matches(/^[A-Z][a-z0-9]{5,20}$/, 'Password must start with a capital letter and must be between 5 and 20 characters'),
        // password: Yup.string().required('Password is required'),
        address: Yup.string().required('Address is required'),
        phone: Yup.string().required('Phone number is required').matches(/^01[0125][0-9]{8}$/, 'Invalid phone number')
    });

    return (
        <div className="container mt-5" >
            <div className="row justify-content-center">
                <div className="col-md-8 mt-5 mb-5">
                    <div className="card shadow" >
                        <div className="card-body">
                            <h2 className="card-title text-center mb-4">Sign Up</h2>
                            <Formik
                                initialValues={{
                                    name: '',
                                    email: '',
                                    password: '',
                                    address: '',
                                    phone: ''
                                }}
                                validationSchema={registerSchema}
                                onSubmit={(values, { setSubmitting }) => {
                                    register(values);
                                    setSubmitting(false);
                                }}
                            >
                                {({ isSubmitting }) => (
                                    <Form style={{height:"60vh"}}>
                                        <div className="mb-3">
                                            <label htmlFor="name" className="form-label">Username</label>
                                            <Field type="text" className="form-control" id="name" name="name" placeholder="Enter your name" />
                                            <ErrorMessage name="name" component="div" className="text-danger" />
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="email" className="form-label">Email</label>
                                            <Field type="text" className="form-control" id="email" name="email" placeholder="Enter your email" />
                                            <ErrorMessage name="email" component="div" className="text-danger" />
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="password" className="form-label">Password</label>
                                            <Field type="password" className="form-control" id="password" name="password" placeholder="Enter your password" />
                                            <ErrorMessage name="password" component="div" className="text-danger" />
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="address" className="form-label">Address</label>
                                            <Field type="text" className="form-control" id="address" name="address" placeholder="Enter your address" />
                                            <ErrorMessage name="address" component="div" className="text-danger" />
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="phone" className="form-label">Phone Number</label>
                                            <Field type="tel" className="form-control" id="phone" name="phone" placeholder="Enter your phone number" />
                                            <ErrorMessage name="phone" component="div" className="text-danger" />
                                        </div>
                                        <div className="d-grid gap-2">
                                            <button type="submit" className="btn btn-primary btn-block" disabled={isSubmitting}>Submit</button>
                                            <p className="text-center mt-3 mb-5">
                                                Already have an account? <Link to="/login">Login</Link>
                                            </p>
                                        </div>
                                    </Form>
                                )}
                            </Formik>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Signup;
