import React from 'react';
import image from "../../assets/doctor2.png"
import "./contact.css"

const ContactUs = () => {
  return (
    <div className="container mt-5 mb-5">
      <div className="row">
        <div className="col-md-8 mt-5">
          <div className="card shadow">
            <div className="card-body ">
              <h5 className="card-title text-center mb-4">Contact Us</h5>
              <form>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">Your Name</label>
                  <input type="text" className="form-control" id="name" />
                </div>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">Your Email</label>
                  <input type="email" className="form-control" id="email" />
                </div>
                <div className="mb-3">
                  <label htmlFor="message" className="form-label">Message</label>
                  <textarea className="form-control" id="message" rows="5"></textarea>
                </div>
                <div className="text-center">
                  <button type="submit" className="btn btn-primary">Submit</button>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div className="col-md-4">
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

export default ContactUs;