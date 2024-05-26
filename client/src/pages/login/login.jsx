import axios from 'axios';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { ContextData } from '../../context/contextData';
import './login.css'
const Login = () => {
    let navigate = useNavigate();
    let {token,setToken}=useContext(ContextData)
    const login = async (userData) => {
        try {
            const { data } = await axios.post('http://localhost:3000/signin', userData);
            console.log(data);
            if (data.message === 'Customer found') {
                localStorage.setItem('token', data.TOKEN);
                setToken(data.TOKEN)
                navigate('/');
            }
        } catch (error) {
            console.error('Error occurred while logging in:', error);
            alert('Invalid email or password');
        }
    };


    const loginSchema = Yup.object().shape({
        email: Yup.string().email('Invalid email').required('Email is required'),
        password: Yup.string().required('Password is required').matches(/^[A-Z][a-z0-9]{5,20}$/, 'Password must start with a capital letter and must be between 5 and 20 characters'),
    });

    return (
        <div className="container mt-5 mb-5">
            <div className="row justify-content-center">
                <div className="col-lg-8">
                    <div className="card shadow">
                        <div className="card-body">
                            <h2 className="card-title text-center mb-4">Login</h2>
                            <Formik
                                initialValues={{
                                    email: '',
                                    password: '',
                                }}
                                validationSchema={loginSchema}
                                onSubmit={(values, { setSubmitting }) => {
                                    login(values);
                                    setSubmitting(false);
                                }}
                            >
                                {({ isSubmitting }) => (
                                    <Form>
                                        <div className="form-group mb-3">
                                            <label htmlFor="email">Email</label>
                                            <Field type="text" className="form-control" id="email" name="email" placeholder="Enter your email" />
                                            <ErrorMessage name="email" component="div" className="text-danger" />
                                        </div>
                                        <div className="form-group mb-3">
                                            <label htmlFor="password">Password</label>
                                            <Field type="password" className="form-control" id="password" name="password" placeholder="Enter your password" />
                                            <ErrorMessage name="password" component="div" className="text-danger" />
                                        </div>
                                        <div className="d-grid gap-2">
                                            <button type="submit" className="btn btn-primary btn-block" disabled={isSubmitting}>Login</button>
                                            <p className="text-center mt-3">
                                                Don't have an account? <Link to="/register">Register</Link>
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

export default Login;
