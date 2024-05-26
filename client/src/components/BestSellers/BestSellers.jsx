import React, { useContext } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './BestSellers.css'; // Import the CSS file
import next from "../../assets/next.png";
import prev from "../../assets/prev.webp";
import { ContextData } from '../../context/contextData';
import { Link } from 'react-router-dom';


const BestSellersComponent = () => {

    const {allMedicine}=useContext(ContextData);

    const randomProducts = allMedicine.sort(() => Math.random()).slice(0, 8);
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

    return (
        <div>
            <h2 className="BestSellers-header">Best Sellers</h2>
            <div className="slider-container">
                <Slider {...settings}>
                    {randomProducts.map((medicene,index)=>{
                        return(
                            <>
                            <div key={index} className="slider-container">
                                <Link to={`/medicines/${medicene.name}`}>
                                    <img src={medicene.image} alt={medicene.name} className='slider-image' style={{ height: "200px", objectFit: "cover", objectPosition: "center", borderRadius: "10px" }} />
                                </Link>
                            </div>
                            </>
                        )
                    })}
                </Slider>
            </div>
        </div>
    );
}

// Custom next arrow component
const CustomNextArrow = (props) => {
    const { onClick } = props;
    return (
        <div className="custom-next-arrow" onClick={onClick}>
            <img className='arrowImg' src={next} alt="" />
        </div>
    );
}

// Custom previous arrow component
const CustomPrevArrow = (props) => {
    const { onClick } = props;
    return (
        <div className="custom-prev-arrow" onClick={onClick}>
            <img className='arrowImg' src={prev} alt="" />
        </div>
    );
}

export default BestSellersComponent;
