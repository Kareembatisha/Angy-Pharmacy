import axios from "axios"
import { createContext, useEffect, useState } from "react"

export const ServicesLogic=createContext()

export default function ServicesProvider(props) {
    const [services,setServices]=useState([])
    const [cartItemsServ, setcartItemsServ] = useState({});
    // console.log(cartItemsServ);

    const getAllServices=async ()=>{
        try{
        let {data}=await axios.get('http://localhost:3000/getAllServices')
        setServices(data.allServices)
        setcartItemsServ(createDefaultCart(data.allServices))
    }catch (error) {
            console.error('Error fetching services:', error);
        }
    }

    function createDefaultCart(services) {
        let cart = {};
        for (const service of services) {
            cart[service._id] = 0;
        }
        console.log(cart);
        return cart;
    }

    function addToCartSer(itemId) {
        setcartItemsServ((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
        window.scrollTo(0, 0);
    }

    function removeFromCartSer(itemId) {
        setcartItemsServ((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
    }

    function getTotalPriceSer() {
        let totalAmount = 0;
        for (const item in cartItemsServ) {
            if (cartItemsServ[item] > 0) {
                let itemInfo = services.find((product) => product._id === item);
                totalAmount += itemInfo.price * cartItemsServ[item];
            }
        }
        return totalAmount;
    }

    function getTotalCartItemsSer() {
        let totalItems = 0;
        for (const item in cartItemsServ) {
            if (cartItemsServ[item] > 0) {
                totalItems += cartItemsServ[item];
            }
        }
        return totalItems;
    }

    useEffect(() => {
        getAllServices()
    },[])

    const servicesLogic = {
        services,
        cartItemsServ,
        addToCartSer,
        removeFromCartSer,
        getTotalPriceSer,
        getTotalCartItemsSer
    }

    return (
        <ServicesLogic.Provider value={servicesLogic}>
            {props.children}
        </ServicesLogic.Provider>
    )
}