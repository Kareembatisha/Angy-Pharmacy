import React, { useState, useEffect } from 'react';
import "./sidebar.css";
import image1 from "../../assets/tips.webp"
import image2 from "../../assets/tips2.png"
import image3 from "../../assets/tips3.jpeg"

const Sidebar = () => {

  

  return (
    <div className="sidebar">
      <div>
        <img src={image1} alt="Image 1"  className='sb-img mb-5'/>
        <img src={image2} alt="Image 2"  className='sb-img mt-5 mb-5'/>
        <img src={image3} alt="Image 2"  className='sb-img mt-5'/>
      </div>
    </div>
  );
};

export default Sidebar;
