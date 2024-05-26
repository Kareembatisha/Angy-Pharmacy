import React, { useContext } from 'react'
import './services.css'

import ServPoster from '../../components/servPoster/servPoster';
import { Link } from 'react-router-dom';
import { ServicesLogic } from '../../context/services';

export default function Services() {

    const {services,addToCartSer}=useContext(ServicesLogic)
    // console.log(services);
    return (
    
        <div className='container-fluid' style={{marginTop:"4rem"}}>
            <ServPoster></ServPoster>
            <div className="container">
            <div className="row">
                <div className="col-9">
                    <div className='servicePoster'>
                        <div className="servicePoster-left">
                            <h1>Measure</h1>
                            <h1>Your {services[0]?.name} </h1><br />
                            <p>Price : {services[0]?.price} LE</p><br />
                            <Link><button onClick={()=>addToCartSer(services[0]._id)} className='btn btn-outline-info btn-sm w-50 text-black'>Order Service</button></Link>
                        </div>
                        <div className="servicePoster-right">
                            <img src={services[0]?.image} alt="Medical Services" />
                        </div>
                    </div>
                </div>
                <div className="col-3"></div>
            </div>  
            <div className="row">
            <div className="col-3"></div>
                <div className="col-9">
                    <div className='servicePoster'>
                        <div className="servicePoster-left">
                            <h1>Measure</h1>
                            <h1>Your {services[1]?.name} </h1><br />
                            <p>Price :{services[1]?.price}  LE</p><br />
                            <Link><button onClick={()=>addToCartSer(services[1]._id)}  className='btn btn-outline-info btn-sm w-50 text-black'>Order Service</button></Link>

                        </div>
                        <div className="servicePoster-right">
                            <img src={services[1]?.image} alt="Medical Services" />
                        </div>
                    </div>
                </div>
            </div>  
            <div className="row">
                <div className="col-9">
                    <div className='servicePoster'>
                        <div className="servicePoster-left">
                            <h1>Measure</h1>
                            <h1>Your {services[2]?.name} </h1><br />
                            <p>Price :{services[2]?.price}  LE</p><br />
                            <Link><button onClick={()=>addToCartSer(services[2]._id)}  className='btn btn-outline-info btn-sm w-50 text-black'>Order Service</button></Link>

                        </div>
                        <div className="servicePoster-right">
                            <img src={services[2]?.image} alt="Medical Services" />
                        </div>
                    </div>
                </div>
                
            </div> 
            </div> 
        </div>
    )
}