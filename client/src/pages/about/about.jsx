import React from 'react';
import img from "../../assets/Pharmacist1.png";
import './about.css';

const About = () => {
  return (
    <div className="container mt-5 mb-5">
      <div className="row">
        <div className="col-md-6">
          <div className="Card h-100">
            <div className="card-body text-center">
              <h2 style={{ color: 'orangered', fontWeight: "700" ,fontSize:"50px" ,marginBottom:"50px" , marginTop:"50px" , textAlign:"left"}}>Doctor Information</h2>
              <ul className="list-unstyled" style={{ textAlign: 'left' }}>
                <li>Name: Dr. Engy Mostafa</li>
                <li>University: Cairo University</li>
                <li>Faculty: Faculty of Pharmacy</li>
                <li>Graduation Year: 1999</li>
                <li>Degree: Good</li>
                <li>Pharmacy License: License #123456789</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="Card">
            <img src={img} className="card-img-top" alt="About Pharmacy" />
          </div>
        </div>
      </div>
      <div className="row mt-4">
        <div className="col-md-4">
          <div className="Card">
            <div className="card-body text-center">
              <h3 style={{ color: 'orangered', fontWeight: "700" }}>About Us</h3>
              <p style={{ textAlign: 'left' }}>
                Welcome to our pharmacy! At Pharmacy Name, we are dedicated to providing exceptional pharmaceutical products and services. Our mission is to promote health and well-being in our community through personalized care and reliable expertise. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              </p>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="Card">
            <div className="card-body text-center">
              <h3 style={{ color: 'orangered', fontWeight: "700" }}>Our Customers</h3>
              <p style={{ textAlign: 'left' }}>
                Our customers are our top priority, and we strive to build lasting relationships by offering compassionate care and attentive service. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              </p>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="Card">
            <div className="card-body text-center">
              <h3 style={{ color: 'orangered', fontWeight: "700" }}>Our Goal</h3>
              <p style={{ textAlign: 'left' }}>
                Our goal is to empower individuals to lead healthier lives by providing access to quality healthcare solutions and education. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
