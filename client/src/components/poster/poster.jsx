import React from 'react';
import "./poster.css"
import find from "../../assets/search.png"
import arrow from "../../assets/arrow.png"
import doctor from "../../assets/doctor.webp"
import { Link } from 'react-router-dom';

const Poster = () =>{
    return(
        <div className="main-poster">
            <div className="main-left">
                <h2>Find Every Medicine</h2>
                <div>
                    <div className="hand-ican">
                        <p>Find</p>
                        <img src={find} alt="" />
                    </div>
                    <p>Your</p>
                    <p>Medicine</p>
                </div>
                <Link className='Link' to = { "/medicines" }>
                <div className='latest-btn'>
                    <div>
                        Browse medicines
                    </div>
                <img src={arrow} alt="" className='arrow' />
                </div>
                </Link>
            </div>
            <div className="main-right">
                <img src={doctor} alt="" className='doctor' />
            </div>
        </div>
    )
}

export default Poster