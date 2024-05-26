import React from 'react'
import './medicinePoster.css'
import mp from "../../assets/MedPoster.png"

export default function MedicinePoster() {
    return (
        <div className="medicinePoster">
            <div className="left">
                <div>
                    <p>Shop with Confidence</p>
                    <p>Trusted Medications</p>
                    <p>Reliable Service</p>
                </div>
            </div>
            <div className="right">
                <img src={mp} alt="" className='icon' />
            </div>
        </div>
    )
}
