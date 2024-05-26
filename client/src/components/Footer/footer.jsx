import React from 'react';
import logo from "../../assets/logo.png";
import "./footer.css"

const Footer = () => {
  return (
    <footer className="footer bg-secondary text-light py-4">
      <div className="container">
        <div className="row">
          <div className="col-4">
            <img src={logo} alt="" style={{height : "150px",width:"auto" , borderRadius:"50%"}}/>
          </div>
          <div className="col-4">
            <h5>Contact Us</h5>
            <p>13 Alexandria st. , Giza, Egypt</p>
            <p>Email: engy.pharmacy.00@gmail.com</p>
            <p>Phone: 02 35657871</p>
          </div>
          <div className="col-4">
            <h5>Follow Us</h5>
            <p>Stay connected with us on social media:</p>
            <div className="d-flex">
              <a href="#" className="text-light me-3">Facebook</a>
              <a href="#" className="text-light me-3">Twitter</a>
              <a href="#" className="text-light me-3">Instagram</a>
            </div>
          </div>
        </div>
        <hr className="mt-4 mb-3" />
        <div className="text-center">
          <p>&copy; 2024 Engy Pharmacy Store. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;