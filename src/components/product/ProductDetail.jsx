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
                <Grid container sx={{display:'flex',gap:'1rem',minHeight:'inherit'}}>
                    <Grid item xs={12} sm={5} sx={{background:'transparent',p:'10px'}}>
                        <Card sx={{background:'transparent',height:'inherit',width:'inherit'}}>
                            <CardMedia
                            sx={{background:'transparent',width: '100%'}}
                            component="img"
                            alt={product.name}
                            height="50%"
                            image={"https://cdn11.bigcommerce.com/s-lpku7oc/images/stencil/1280x1280/products/7932/54428/8010GRYvividelctricblue__33962.1618350412.jpg?c=2"}>

                            </CardMedia>
                            <CardActions sx={{width: '100%'}}>
                                <ImageList sx={{ width: 'inherit', height: '15%' }} cols={3} >
                                    {itemData.map((item) => (
                                        <Button key={item.img} sx={{maxHeight:"inherit",maxWidth:"100%",minWidth:'100%'}}>
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
                    <Grid item sm={12} sm={6} sx={{display:'flex',flexDirection:'column',background:'transparent',minHeight:'inherit',p:'10px'}}>
                        <Typography component={'h1'} varient={'h1'}>
                            {product.name}
                        </Typography>
                        <Typography component={'h6'}><span>Model: </span>{product.model}</Typography>
                        <Typography><span>Brand: </span>{product.brand}</Typography>
                        <Typography><span>Color: </span>{product.color}</Typography>
                        <Typography><span>Price: </span>{product.unit_price}</Typography>
                        <Typography varient='body' component={"p"} sx={{fontSize:'.7rem',pb:'10px'}}><span style={{display:'block'}}>Details: </span>{product.details}</Typography>
                        <Button >Add to Cart</Button>
                    </Grid>
                </Grid>
        </Container>   
        
    );
}

export default ProductDetails;