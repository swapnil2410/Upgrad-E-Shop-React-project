import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import './productCard.css'
import { IconButton } from '@mui/material';
import { useNavigate, useRouteLoaderData } from 'react-router-dom';

function ProductCard({ id, imageSrc, productName, price, description,triggerDeleteModal }) {
    const token = useRouteLoaderData('root');
    const navigate = useNavigate();
    const productId = id;

    const productBuyHandler = (productId) =>{
        navigate('/product-details',{ state: { id: productId } });
    }

    const updateProductHandler = () =>{
        navigate('/add-product',{ state: { updateType: 'UPDATE', id,imageSrc,productName,price,description } });
    }

    return (
        <Card sx={{ maxWidth: 345 }} className='card-container'>
            <CardMedia
                sx={{ height: 300, objectFit:'inherit' }}
                image={imageSrc}
                title={productName}
            />
            <CardContent>
                <div className='title-price-container'>
                    <Typography gutterBottom variant="h5" component="div" className='product-name-container'>
                        {productName}
                    </Typography>
                    <Typography gutterBottom variant="h5" component="div" className='product-price-container'>
                    ₹{price}    
                    </Typography>
                </div>
                
                <Typography variant="body2" color="text.secondary">
                    {description}
                </Typography>
            </CardContent>
            <CardActions className='card-actions'>
                <Button variant='contained' size="medium" onClick={() => {
                        productBuyHandler(productId)
                    }}>Buy</Button>

                {token.userRole === 'ADMIN' && <div className='action-button-container'>
                    <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            sx={{ mr: 2 }}
                            onClick={()=>updateProductHandler()}
                        >
                            <EditIcon />
                        </IconButton>
                        <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            sx={{ mr: 2 }}
                            onClick={triggerDeleteModal}
                        >
                            <DeleteIcon />
                        </IconButton>
                </div>}
                
            </CardActions>
        </Card>
    );
}

export default ProductCard;
