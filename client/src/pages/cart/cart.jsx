import React, { useContext, useState } from 'react';
import './cart.css';
import { ContextData } from '../../context/contextData';
import iconDelete from '../../assets/cart_cross_icon.png';
import iconAdd from '../../assets/plus.png'
import axios from 'axios';
import { Link } from 'react-router-dom';
import { ServicesLogic } from '../../context/services';

export default function Cart() {
    const {decodedToken, allMedicine, cartItems, removeFromCart, getTotalPrice, addToCart } = useContext(ContextData);
    const {services,cartItemsServ,removeFromCartSer,getTotalPriceSer}=useContext(ServicesLogic)
    const [checkOut, setCheckOut] = useState(false);
    const [address, setAddress] = useState('');
    const [isPlacingOrder, setIsPlacingOrder] = useState(false);

    const handleProceedToCheckout = () => {
        setCheckOut(true);
    };
    const handleAddressInputChange = (event) => {
        setAddress(event.target.value);
    };
    const placeOrder = async () => {
        if (isPlacingOrder) {
            return;
        }
        setIsPlacingOrder(true);
    
        const medicineItems = allMedicine
            .filter(item => cartItems[item._id] > 0)
            .map(item => ({
                name: item.name,
                quantity: cartItems[item._id]
            }));
    
        const serviceItems = services
            .filter(service => cartItemsServ[service._id] > 0)
            .map(service => ({
                name: service.name,
                quantity: cartItemsServ[service._id]
            }));
    
        const order = {
            customerEmail: decodedToken.email,
            items: [...medicineItems, ...serviceItems],
            total: getTotalPrice() + getTotalPriceSer(),
            address: address
        };
    
        console.log(order);
        await sendOrder(order);
    
        allMedicine.forEach(item => {
            if (cartItems[item._id] > 0) {
                removeFromCart(item._id);
            }
        });
    
        services.forEach(service => {
            if (cartItemsServ[service._id] > 0) {
                removeFromCartSer(service._id);
            }
        });
    
        setIsPlacingOrder(false);
        setCheckOut(false);
        setAddress('');
    };

    
    const canProceedToCheckout = allMedicine.some(item => cartItems[item._id] > 0);

    async function sendOrder(order) {
        try {
            let { data } = await axios.post('http://localhost:3000/addOrder', order);
            console.log(data);
        } catch (error) {
            console.error('Error placing order:', error);
        }
    }

    return (
        <div className='CartItems'>
            <div className="CartIt-format-main">
                <p>Products</p>
                <p>Title</p>
                <p>Price</p>
                <p>Quantity</p>
                <p>Total</p>
                <p>Remove / Add</p>
            </div>
            <hr />

            {allMedicine.map((item) => {
                if (cartItems[item._id] > 0) {
                    return (
                        <div key={item._id}>
                            <div className="CartItems-format CartIt-format-main">
                                <img className='CartIcon-product-icon' src={item.image} alt="" />
                                <p>{item.name}</p>
                                <p>L.E {item.price}</p>
                                <button className='CartItems-quantity'>{cartItems[item._id]}</button>
                                <p>L.E {item.price * cartItems[item._id]}</p>
                                <div className="CartItems-icons">
                                    <img className='CartItems-delete' style={{ cursor: 'pointer', width: '20px', height: '20px' ,display:"inline-block",marginLeft:"30px" }} src={iconDelete} onClick={() => removeFromCart(item._id)} alt="" />
                                    <img className='CartItems-add' style={{ cursor: 'pointer', width: '30px', height: '30px' ,display:"inline-block" }} src={iconAdd} onClick={() => addToCart(item._id, "medicine")} alt="" />
                                </div>
                            </div>
                            <hr />
                        </div>
                    );
                }
                return null;
            })}
            
            {services.map((service) => {
                if (cartItemsServ[service._id] > 0) {
                    return (
                        <div key={service._id}>
                            <div className="CartItems-format CartIt-format-main">
                                <img className='CartIcon-product-icon' src={service.image} alt="" />
                                <p>{service.name}</p>
                                <p>L.E {service.price}</p>
                                <button className='CartItems-quantity'>{cartItemsServ[service._id]}</button>
                                <p>L.E {service.price * cartItemsServ[service._id]}</p>
                                <div className="CartItems-icons">
                                    <img className='CartItems-delete' style={{ cursor: 'pointer', width: '20px', height: '20px' ,display:"inline-block",marginLeft:"30px" }} src={iconDelete} onClick={() => removeFromCartSer(service._id)} alt="" />
                                </div>
                            </div>
                            <hr />
                        </div>
                    );
                }
                return null;
            })}
            
            <div className="cartitems-down">
                <div className="cartitems-total">
                    <h1>Cart Total</h1>
                    <div>
                        <div className="cartitems-total-price">
                            <p>Subtotal</p>
                            <p>L.E {getTotalPrice() + getTotalPriceSer()}</p>
                        </div>
                        <hr />
                        <div className="cartitems-total-price">
                            <p>Shipping Fee</p>
                            <p>Free</p>
                        </div>
                        <hr />
                        <div className="cartitems-total-price">
                            <h3>Total</h3>
                            <h3>L.E {getTotalPrice() + getTotalPriceSer()}</h3>
                        </div>
                    </div>

                    <button onClick={handleProceedToCheckout} disabled={!canProceedToCheckout}>PROCEED TO Checkout</button>
                    {checkOut && (
                        <div className="cartitems-promoBox">
                            <input type="text" placeholder='Enter your address' className='cartitems-address' value={address} onChange={handleAddressInputChange} />
                            <Link to={'/orderHistory'}><button onClick={placeOrder} disabled={isPlacingOrder}>Place Order</button></Link>
                            
                        </div>
                    )}
                </div>
                <div className="cartitems-promocode">
                    <p>Have a promo code?</p>
                    <div className="cartitems-promoBox">
                        <input placeholder='Enter your promo code' type="text" />
                        <button>Submit</button>
                    </div>
                </div>
            </div>
        </div>
    );
}