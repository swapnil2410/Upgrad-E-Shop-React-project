import { Link } from 'react-router-dom';
import './404.css';

function Error404(){
    return <>
       <h3>Error 404 - Page not found</h3>
       <p><Link to='/'>Home</Link></p>
    </>
}

export default Error404;