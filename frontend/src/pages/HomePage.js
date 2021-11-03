import React, { useEffect } from 'react';

// react-redux
import { useSelector, useDispatch } from 'react-redux';

// bootstrap
import { Row, Col } from 'react-bootstrap';

// actions
import { listProducts } from '../actions/productActions';

// components
import ProductCard from '../components/ProductCard';

// UI
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