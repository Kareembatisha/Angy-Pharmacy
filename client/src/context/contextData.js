import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { createContext, useEffect, useState } from "react";

export const ContextData = createContext();

export default function ContextDataProvider(props) {
    const [allMedicine, setAllMedicine] = useState([]);
    const [token, setToken] = useState(null);
    const [cartItems, setCartItems] = useState({});
    // console.log(cartItems);
    const [email, setEmail] = useState("");
    const getEmail = () => {
        try {
            const codeEmail = localStorage.getItem('token');
            const email = codeEmail ? jwtDecode(codeEmail) : null;
            setEmail(email.email);
            return email;
        } catch (error) {
            console.error('Error getting email:', error);
        }
    }
    useEffect(() => {
        getAllMedicenes();
        getEmail();
    }, []);

    async function getAllMedicenes() {
        try {
            const { data } = await axios.get('http://localhost:3000/getAllMedicines');
            setAllMedicine(data.allMedicines);
            setCartItems(createDefaultCart(data.allMedicines));
        } catch (error) {
            console.error('Error fetching medicines:', error);
        }
    }



    function createDefaultCart(medicines) {
        let cart = {};
        for (const medicine of medicines) {
            cart[medicine._id] = 0;
        }
        // console.log(cart);
        return cart;
    }

    function addToCart(itemId) {
        setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
        window.scrollTo(0, 0);
    }
    
    function removeFromCart(itemId) {
        setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
    }

    function getTotalPrice() {
        let totalAmount = 0;
        for (const item in cartItems) {
            if (cartItems[item] > 0) {
                let itemInfo = allMedicine.find((product) => product._id === item);
                totalAmount += itemInfo.price * cartItems[item];
            }
        }
        return totalAmount;
    }

    function getTotalCartItems() {
        let totalItems = 0;
        for (const item in cartItems) {
            if (cartItems[item] > 0) {
                totalItems += cartItems[item];
            }
        }
        return totalItems;
    }

    const decodedToken = token ? jwtDecode(token) : null;

    let contextData = {
        token,
        setToken,
        allMedicine,
        cartItems,
        decodedToken,
        addToCart,
        removeFromCart,
        getTotalCartItems,
        getTotalPrice,
        getEmail,
        email
    };

    return (
        <ContextData.Provider value={contextData}>
            {props.children}
        </ContextData.Provider>
    );
}