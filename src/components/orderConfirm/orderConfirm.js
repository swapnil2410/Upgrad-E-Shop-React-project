import { Link } from 'react-router-dom';
import './orderConfirm.css';
import { useEffect, useState } from 'react';

const OrderConfirm = (props) => {
    const [finalPrice, setFinalPrice] = useState(0);

    useEffect(()=>{
        finalPriceHandler();
    },[])
    
    const finalPriceHandler =() =>{
      const price =  (+props.product?.price) * (+props.product?.qty);
      setFinalPrice(price);
    }

    return (<>
        
        <div className='order-confirm-container'>
            <div className='order-details'>
               <h3>{props.product?.title}</h3>
                <p>Quantity: {props.product?.qty}</p>
                <p>Category: <strong> {props.product?.category}</strong></p>
                <p>{props.product?.description}</p>
                <h2 className='final-price'>Total Price: Rs.
                    {finalPrice} </h2>
            </div>
            <div className='shipment-address-details'>
            <h3>Address details</h3>
                <p> {props.address?.name}<br/>
                 {props.address?.contactNumber}<br/>
                 {props.address?.street}<br/>
                {props.address?.city}<br/>
                 {props.address?.state}<br/>
                 {props.address?.landmark}<br/>
                 {props.address?.zipcode}</p>
            </div>
        </div>
    </>)
}

export default OrderConfirm;