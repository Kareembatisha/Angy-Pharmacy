import React, { useContext, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from "./pages/home/home.jsx"
import ContactUs from './pages/contact/contact.jsx';
import Login from './pages/login/login.jsx';
import Signup from './pages/signup/signup.jsx';
import Categories from './pages/categories/categories.jsx';
import Medicines from './pages/medicines/medicines.jsx';
import Medicine from './pages/medicine/medicine.jsx';
import Category from './pages/category/category.jsx';
import About from './pages/about/about.jsx';
import { ContextData } from './context/contextData.js';
import IsLogin from './context/isLogin.js';
import Cart from './pages/cart/cart.jsx';
import MainLayout from './Layouts/mainLayout/mainLayout.jsx';
import OrderHistory from './pages/orderHistory/orderHistory.jsx';
import Services from './pages/services/services.jsx';



const App = () => {
  let {setToken}=useContext(ContextData)

  useEffect(() => {
      if(localStorage.getItem('token')){
          setToken(localStorage.getItem('token'))
      }
  },[])

  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<MainLayout><Home/></MainLayout>} />
          <Route path="/contact" element={<MainLayout><IsLogin><ContactUs/></IsLogin></MainLayout>} />
          <Route path="/register" element={<Signup/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/medicines" element={<MainLayout><Medicines/></MainLayout>} />
          <Route path="/medicines/:name" element={<MainLayout><Medicine/></MainLayout>} />
          <Route path="/categories" element={<MainLayout><Categories/></MainLayout>} />
          <Route path="/category/:name" element={<MainLayout><Category/></MainLayout>} />
          <Route path="/about" element={<MainLayout><About/></MainLayout>} />
          <Route path="/cart" element={<MainLayout><IsLogin><Cart/></IsLogin></MainLayout>} />    
          <Route path='/orderHistory' element={<MainLayout><IsLogin><OrderHistory/></IsLogin></MainLayout>}/>
          <Route path="/services" element={<MainLayout><Services/></MainLayout>} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;

