import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import './productCard.css'

function ProductCard({ imageSrc, productName, price, description }) {
    return (
        <Card sx={{ maxWidth: 345 }} className='card-container'>
            <CardMedia
                sx={{ height: 300 }}
                image={imageSrc}
                title="green iguana"
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {productName}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {description}
                </Typography>
            </CardContent>
            <CardActions className='card-actions'>
                <Button size="medium">Rs. {price}</Button>
                <Button variant='contained' size="medium">Buy</Button>
            </CardActions>
        </Card>
    );
}

export default ProductCard;
