import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ContextData } from '../../context/contextData';
import logo from "../../assets/logo.png";
import cartItem from '../../assets/cart_icon.png';
import './navbar.css';
import { ServicesLogic } from '../../context/services';

const Navbar = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [medicineSuggestions, setMedicineSuggestions] = useState([]);
    const { token, setToken, getTotalCartItems, allMedicine } = useContext(ContextData);
    const {getTotalCartItemsSer}=useContext(ServicesLogic)
    const navigate = useNavigate();

    function logOut() {
        localStorage.removeItem('token');
        setToken(null);
        navigate('/login');
    }

    const handleSearchInputChange = (event) => {
        const query = event.target.value;
        setSearchQuery(query);
        // Filter medicine suggestions based on the input query
        const suggestions = allMedicine.filter(medicine =>
            medicine.name.toLowerCase().includes(query.toLowerCase())
        );
        setMedicineSuggestions(suggestions);
    };

    const handleSearchSubmit = (event) => {
        event.preventDefault();
        navigate(`/medicines/${searchQuery}`);
        setSearchQuery(''); // Clear the search query after navigation
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-light custom-navbar">
            <div className="container-fluid">
                <div className="col-4">
                    <Link to={'/'}>
                        <img src={logo} alt="Logo" className="navbar-logo" />
                    </Link>
                </div>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse justify-content-center" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link to={'/'} className='nav-link active'>Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link to={'/about'} className='nav-link active'>About</Link>
                        </li>
                        <li className="nav-item">
                            <Link to={'/contact'} className='nav-link active'>Contact</Link>
                        </li>
                        <li className="nav-item">
                            <select className="form-select " aria-label="Default select example" onChange={(e) => navigate(e.target.value)} style={{fontSize:"30px" , fontWeight:"700", border:"none", boxShadow:"none"}}>
                                <option selected disabled>Browse Shop</option>
                                <option value="/categories">Categories</option>
                                <option value="/medicines">Medicines</option>
                                {/* <option value="/prescription">Prescription</option> */}
                                <option value="/orderHistory">Order History</option>
                                <option value="/services">Services</option>
                            </select>
                        </li>
                    </ul>
                    <form className="d-flex" onSubmit={handleSearchSubmit}>
                        <div className="input-group mt-2">
                            <input
                                className="form-control"
                                type="search"
                                placeholder="Search"
                                aria-label="Search"
                                value={searchQuery}
                                onChange={handleSearchInputChange}
                                list="medicineSuggestions"
                            />
                            <datalist id="medicineSuggestions">
                                {medicineSuggestions.map((medicine, index) => (
                                    <option key={index} value={medicine.name} />
                                ))}
                            </datalist>
                            <button className="btn btn-dark" type="submit">
                            <i className="fa-solid fa-magnifying-glass" style={{color: 'white'}} />
                            </button>
                        </div>
                    </form>
                    <div className='nav-login'>
                        <Link to={'/cart'}>
                            <img src={cartItem} alt='cart' />
                        </Link>
                        <div className='nav-cart-count'>{getTotalCartItems() + getTotalCartItemsSer()}</div>
                        {token ?
                            <Link to={'/login'}>
                                <button className='btn btn-outline-danger' onClick={logOut}>Logout</button>
                            </Link>
                            :
                            <Link to={'/login'}>
                                <button className='btn btn-outline-dark'>Login</button>
                            </Link>
                        }
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
