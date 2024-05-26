
import './serviscesPoster.css'
import serv from "../../assets/services.png"
import { Link } from 'react-router-dom'

const ServiscesPoster = () => {

       
    return (
        <div className='ServiscesPoster'>
            <div className="ServiscesPoster-left">
                <h1>Medical</h1>
                <h1>Services For You</h1>
                <p>CHOOSE THE SERIVCE YOU NEED</p>
                <Link to="/services"><button className='btn btn-outline-info btn-sm w-50 text-black'>Check Now</button></Link>
            </div>
            <div className="ServiscesPoster-right">
                <img src={serv} alt="" />
            </div>
        </div>
    )
}

export default ServiscesPoster