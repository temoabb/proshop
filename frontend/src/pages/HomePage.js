import React, { useState, useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';
import axios from 'axios';
// import products from '../products';
import ProductCard from '../components/ProductCard';


const HomePage = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {

    axios.get('/api/products')
      .then(res => setProducts(res.data))
      .catch(err => console.log(err));

    // const fetchProducts = async () => {
    //   const { data } = await axios.get('/api/products');
    //   setProducts(data);
    // };
    // fetchProducts();
  }, [])

  return (
    <React.Fragment>
      <h1>Latest Products</h1>
      <Row>
        {products.map(product => (
          <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
            <ProductCard product={product} />
          </Col>
        ))}
      </Row>
    </React.Fragment>
  )
};


export default HomePage;