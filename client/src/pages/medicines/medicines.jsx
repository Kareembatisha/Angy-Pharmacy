import React, { useEffect, useState } from 'react';
import './medicines.css';
import { Link } from 'react-router-dom';
import MedicinePoster from '../../components/medicinePoster/medicinePoster';
import axios from 'axios';
import Sidebar from '../../components/sidebar/sidebar';

export default function Medicines() {
    const [medicines, setMedicines] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);

    const getMedicines = async () => {
        try {
            const { data } = await axios.get('http://localhost:3000/getAllMedicines');
            setMedicines(data.allMedicines);
        } catch (error) {
            console.error('Error fetching medicines:', error);
        }
    }

    useEffect(() => {
        getMedicines();
    }, []);

    // Calculate the index of the first and last medicine to display on the current page
    const indexOfLastMedicine = currentPage * 9;
    const indexOfFirstMedicine = indexOfLastMedicine - 9;
    const currentMedicines = medicines.slice(indexOfFirstMedicine, indexOfLastMedicine);

    // Change page
    const paginate = pageNumber => setCurrentPage(pageNumber);

    return (
        <div className='container-fluid ' style={{marginTop:"4rem"}}>
            <MedicinePoster />
            <div className="row p-5">
                <div className="col-3 mt-5"> {/* Sidebar column */}
                    <Sidebar />
                </div>
                <div className="col-9"> {/* Main content column */}
                    <div className='container mt-5 mb-5'>
                        <div className="row">
                            {currentMedicines.map((medicine, index) => (
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
                    <nav>
                        <ul className="pagination justify-content-center">
                            {Array.from({ length: Math.ceil(medicines.length / 10) }, (_, i) => (
                                <li className="page-item" key={i}>
                                    <button className="page-link" onClick={() => paginate(i + 1)}>{i + 1}</button>
                                </li>
                            ))}
                        </ul>
                    </nav>
                </div>
            </div>
        </div>
    );
}
