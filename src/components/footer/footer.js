import { Link } from 'react-router-dom';
import './footer.css';

function Footer(){
    return <>
    <div className='footer-container'>
       <p>Copyright <a href='https://www.upgrad.com/' target='_blank'>@Upgrad</a>  2024</p>
       <p>PLEASE NOTE: instructions were not given for the backend code integration nor in the live sessions, so we have used the APIs from <a href='https://fakestoreapi.com/' target='_blank'>https://fakestoreapi.com/</a></p>

    </div>
    </>
}

export default Footer;