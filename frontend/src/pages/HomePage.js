import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { Row, Col } from 'react-bootstrap';
import ProductCard from '../components/ProductCard';
import { listProducts } from '../actions/productActions';

import Message from '../components/Message';
import Loader from '../components/Loader';


const HomePage = () => {
  const productList = useSelector(state => state.productList);
  const { loading, products, error } = productList;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listProducts())
  }, [dispatch]);

  return (
    <React.Fragment>
      <h1>Latest Products</h1>
      {loading
        ? <Loader />
        : error
          ? <Message variant="danger">{error}</Message>
          : (
            <Row>
              {products.map(product => (
                <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                  <ProductCard product={product} />
                </Col>
              ))}
            </Row>
          )}
    </React.Fragment>
  )
};


export default HomePage;