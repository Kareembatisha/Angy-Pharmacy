import React, { useContext, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import next from "../../assets/next.png";
import prev from "../../assets/prev.webp";
import Slider from 'react-slick';
import MedicinePoster from '../../components/medicinePoster/medicinePoster';
import { ContextData } from '../../context/contextData';
export default function Medicine() {

    let{addToCart}=useContext(ContextData)

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 1,
        nextArrow: <CustomNextArrow />,
        prevArrow: <CustomPrevArrow />,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    };

    const { name } = useParams();
    const [medicine, setMedicine] = useState(null);
    
    // console.log(medicine);
    const[mediceneSameCategory,setmediceneSameCategory]=useState([])

    const randomProducts = mediceneSameCategory.sort(() => Math.random()).slice(0, 6);
    // console.log(randomProducts);
    async function MedicineByName() {
        try {
            const { data } = await axios.get(`http://localhost:3000/getMedicineByName/${name}`);
            setMedicine(data.found);
        } catch (error) {
            console.error('Error fetching medicine details:', error);
        }
    }

    async function mediceneCategory() { ///getMedicineByCategory/:category
        try {
            const { data } = await axios.get(`http://localhost:3000/getMedicineByCategory/${medicine.category}`);
            setmediceneSameCategory(data.found);
            // console.log(data.found); 
        } catch (error) {
            console.error('Error fetching medicine details:', error);
        }
    }
    
    const scrollToTopAndSetMedicine = (medicene) => {
        setMedicine(medicene);
        window.scrollTo(480, 480);
    };
    


    useEffect(() => {
        MedicineByName();
    },[]);

    useEffect(() => {
        mediceneCategory();
    },[medicine]);

    if (!medicine) {
        return <p>Loading...</p>;
    }


    return (
        <>
            <div className='container mb-5'>
            <MedicinePoster />
            </div>
            <div className="container">
                <div className="row">
                    <div className="col-md-4">
                        <div className="card border-0 shadow-lg">
                            <img src={medicine.image} className="card-img-top" alt={medicine.name} style={{ height: 'auto', width: "100%", objectFit: 'cover' }} />
                        </div>
                    </div>
                    <div className="col-md-8 mb-5">
                        <div className="card border-0 shadow-lg">
                            <div className="card-body">
                                <h1 className="card-title">{medicine.name}</h1>
                                <ul className="list-group list-group-flush">
                                    <li className="list-group-item"><strong>Expiration Date:</strong> {(medicine.expDate).slice(0, 10)}</li>
                                    <li className="list-group-item"><strong>Manufacture Date:</strong> {(medicine.mfgDate).slice(0, 10)}</li>
                                    <li className="list-group-item"><strong>Active Substance:</strong> {(medicine.activeSubstance).join(", ")}</li>
                                    <li className="list-group-item"><strong>Company:</strong> {medicine.company}</li>
                                    <li className="list-group-item"><strong>Category:</strong> {medicine.category}</li>
                                    {medicine.stock > 0 ? (
                                        <li className="list-group-item"><strong>Stock:</strong> {medicine.stock}</li>
                                    ): (
                                        <li className="list-group-item"><strong>Stock:</strong> <strong className='text-danger'>Out of Stock</strong></li>
                                    )}
                                    <li className="list-group-item"><strong>Price:</strong> {medicine.price}</li>
                                </ul>
                                <div className="mt-3">
                                    {medicine.stock > 0 ? (
                                        <Link style={{ fontWeight: "bold", fontSize: "20px" }}  className="btn btn-outline-warning d-block ms-auto text-dark" onClick={() => addToCart(medicine._id)}><i className="fa-solid fa-cart-shopping" style={{ marginRight: "15px" }}></i>Add to Cart</Link>
                                    ) : (
                                        <button className="btn btn-warning d-block ms-auto text-dark w-100" disabled style={{ fontWeight: "bold", fontSize: "20px" }}>Out Of Stock</button>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <h2 className="category-header mt-5">Similar Medicines</h2>

                    <div className="category-header m-auto">
            <div className="slider-container">
                <Slider {...settings}>
                {randomProducts.map((medicene,index)=>{
                    return(
                        <>
                        <div key={index} className="slider-container">
                        <Link onClick={() => scrollToTopAndSetMedicine(medicene)}>
                            <img src={medicene.image} alt={medicene.name} className='slider-image' style={{ height: "auto", width: "100%", objectFit: "cover", objectPosition: "center", borderRadius: "10px" }} />
                        </Link>
                        </div>
                        </>
                    )
                })}
                </Slider>
                
            </div>
        </div>
                
        </>
    );
    
    
}
const CustomNextArrow = (props) => {
    const { onClick } = props;
    return (
        <div className="custom-next-arrow" onClick={onClick}>
            <img className='arrowImg' src={next} alt="" />
        </div>
    );
}
const CustomPrevArrow = (props) => {
    const { onClick } = props;
    return (
        <div className="custom-prev-arrow" onClick={onClick}>
            <img className='arrowImg' src={prev} alt="" />
        </div>
    );
}
