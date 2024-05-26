import React from 'react'
import './servPoster.css'
import mp from "../../assets/MedPoster.png"

export default function ServPoster() {
    return (
        <div className="servPoster">
            <div className="serv-left">
                <div>
                    <p>Shop with Confidence</p>
                    <p>Trusted Medications</p>
                    <p>Reliable Service</p>
                </div>
            </div>
            <div className="serv-right">
                <img src={mp} alt="" className='icon' />
            </div>
        </div>
    )
}
