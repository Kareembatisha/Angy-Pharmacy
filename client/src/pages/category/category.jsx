import axios from 'axios'; // Add this line

import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import MedicinePoster from '../../components/medicinePoster/medicinePoster';
import Sidebar from '../../components/sidebar/sidebar';

export default function Category() {
    const { name } = useParams();
    console.log(name);
    const [medicines, setMedicines] = useState([]);
    console.log(medicines);
    async function getMedicines() {
        try {
            let { data } = await axios.get(`http://localhost:3000/getMedicineByCategory/${name}`);
            console.log(data.found);
            setMedicines(data.found);
        }catch (error) {
        console.error('Error fetching medicine details:', error);
        }
    }

    useEffect(() => {
        getMedicines();
    },[]);

    return (
        <>
        <div className='container-fluid mb-5' style={{marginTop:"4rem"}}>
        <MedicinePoster  />
        </div>
    {medicines.length === 0 ? (
    <h1 className="text-center mt-5 mb-5">No Medicines Found</h1>
) : (

    <div className="container-fluid mt-5 mb-5">
    <div className="row p-5">
        <div className="col-3">
            <Sidebar></Sidebar>
        </div>
        <div className="col-9">
            <h1 style={{display:"flex" , alignItems:"center" , justifyContent:"center"}}><span style={{fontSize:"3rem" , textAlign:"center", margin:"2rem", borderBottom:"1px black solid", fontFamily:'"Red Hat Mono", monospace'}}><span style={{color:"orangered", fontSize:"3rem"}}>{medicines[0].category}</span></span></h1>
            <div className="row">
            {medicines.map((medicine, index) => (
                        <div className='col-md-4' key={index}>
                                <div className="card card-medicine m-4">
                                    <div className="card-body">
                                    <Link to={`/medicines/${medicine.name}`}>
                                        <img src={medicine.image} alt={medicine.name} className="imgCard " />
                                    </Link>
                                        <h5 className="card-title mt-3 fw-bold">Name: <span>{medicine.name}</span></h5><br />
                                        <p className="card-text">Price: <span>{medicine.price} L.E</span></p>
                                    </div>
                                    
                                </div>
                            
                        </div>
                    ))}
            </div>
        </div>
    
    </div>
    </div>
)}


    </>
    );
}
