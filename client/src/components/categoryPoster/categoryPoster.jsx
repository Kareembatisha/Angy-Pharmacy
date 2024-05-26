import React from 'react'
import './categoryPoster.css'
import mp from "../../assets/MedPoster.png"

export default function CategoryPoster() {
    return (
        <div className="categoryPoster">
            <div className="category-left">
                <div>
                    <p>Shop with Confidence</p>
                    <p>Trusted Medications</p>
                    <p>Reliable Service</p>
                </div>
            </div>
            <div className="category-right">
                <img src={mp} alt="" className='icon' />
            </div>
        </div>
    )
}
