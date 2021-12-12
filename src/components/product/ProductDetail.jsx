import * as React from 'react';
import { useParams } from 'react-router-dom';
import {useState, useEffect} from 'react'; 
import axiosInstance from '../../Axios';
import { flexCenter } from '../styleJsx/style';

import { 
    Container,
    Grid,
    Card,
    CardMedia,
    CardActions,
    Typography,
    ImageList,
    ImageListItem,
    Button,
    } 
    from '@mui/material';


const ProductDetails = () => {

    let {id} = useParams();
    const [product,setProduct] = useState({});
    const itemData = [
        {
          img: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
          title: 'Breakfast',
        },
        {
          img: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d',
          title: 'Burger',
        },
        {
          img: 'https://images.unsplash.com/photo-1522770179533-24471fcdba45',
          title: 'Camera',
        }
    ];
    useEffect(() => {
        axiosInstance.get('product/'+id+'/').then((result) => {
            setProduct(result.data);
            console.log(product.name);
            
        });
    },[setProduct]);

    return (
      
        <Container sx={{ bgcolor: '#cfe8fc', minHeight: '100vh',gap:'1rem',...flexCenter}}>
                <Grid container sx={{...flexCenter,justifyContent:'flex-start',gap:'1rem',minHeight:'inherit'}}>
                    <Grid item sm={12} md={5} sx={{background:'red'}}>
                        <Card sx={{height:'inherit'}}>
                            <CardMedia
                            component="img"
                            alt={product.name}
                            height="50%"
                            image={"https://cdn11.bigcommerce.com/s-lpku7oc/images/stencil/1280x1280/products/7932/54428/8010GRYvividelctricblue__33962.1618350412.jpg?c=2"}>

                            </CardMedia>
                            <CardActions>
                                <ImageList sx={{ width: 500, height: '15%' }} cols={3} rowHeight={124}>
                                    {itemData.map((item) => (
                                        <Button key={item.img}>
                                        <ImageListItem >
                                        <img
                                            src={`${item.img}?w=124&h=124&fit=crop&auto=format`}
                                            
                                            alt={item.title}
                                            loading="lazy"
                                            overflow='hidden'
                                        />
                                        </ImageListItem>
                                        </Button>
                                    ))}
                                </ImageList>
                            </CardActions>
                        </Card>
                    </Grid>
                    <Grid item sm={12} md={6} sx={{display:'flex',flexDirection:'column',background:'gray',minHeight:'inherit'}}>
                        <Typography component={'h1'} varient={'h1'}>
                            {product.name}
                        </Typography>
                        <Typography component={'h6'}>{product.model}</Typography>
                        <Typography>{product.brand}</Typography>
                        <Typography>{product.color}</Typography>
                        <Typography>{product.unit_price}</Typography>
                        <Typography varient='body' component={"p"} sx={{fontSize:'.5rem'}}>{product.details}</Typography>
                        <Button >Add to Cart</Button>
                    </Grid>
                </Grid>
        </Container>   
        
    );
}

export default ProductDetails;