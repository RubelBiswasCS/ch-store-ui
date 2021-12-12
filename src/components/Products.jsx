import * as React from 'react';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

const Product = (props) => {

    const { products } = props;
	if (!products || products.length === 0) return <p>Can not find any products</p>;

	return (
            <Container sx={{ py: 2 }} maxWidth="md">
                {/* End hero unit */}
                <Grid container spacing={2}>
                    {products.map((product) => (
                        <Grid item key={product.name} sx={{height:'auto'}} xs={12} sm={6} md={4}>
                            <Card
                                sx={{ height: 'auto', display: 'flex', flexDirection: 'column' }}
                            >
                                <CardMedia
                                component="img"
                                sx={{
                                    // 16:9
                                    maxHeight:'70%',
                                    padding:'5%',
                                }}
                                image="https://source.unsplash.com/random"
                                alt="random"
                                />
                                <CardContent sx={{ flexGrow: 1, maxHeight:'40%',justifyContent:'center' }}>
                                <Typography variant="h6" component="h6" sx={{display:'flex',justifyContent:'center',fontSize:".5rem",fontWeight: '700'}}>
                                    Heading
                                </Typography>
                                <Typography variant="h6" component="h6" sx={{display:'flex',justifyContent:'center',fontSize:".75rem",fontWeight: '500'}}>
                                    {'500'} $
                                </Typography>
                                </CardContent>
                                <CardActions sx={{maxHeight:'10%',justifyContent:'center'}}>
                                <Button size="small" >View</Button>
                                <Button size="small" >Add to Cart</Button>
                                </CardActions>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Container>
    );
}

export default Product;