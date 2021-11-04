import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useHistory, Link } from 'react-router-dom';
import { Row, Col, Image, ListGroup, Card, Button, Form } from 'react-bootstrap';

import { listProductDetails } from '../actions/productActions';

import Loader from '../components/Loader';
import Message from '../components/Message';
import Rating from '../components/Rating';

const SingleProductDetailsPage = () => {
  console.log('single product details rerender');

  const { id } = useParams();
  const history = useHistory();

  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(1);

  const productDetails = useSelector(state => state.productDetails);
  const { error, loading, product } = productDetails;

  useEffect(() => {
    dispatch(listProductDetails(id));
  }, [])

  const addToCartHandler = () => {
    history.push(`/cart/${id}?qty=${quantity}`)
  };

  return (
    <React.Fragment>
      <Link className="btn btn-light my-3" to='/'>Go Back</Link>
      {loading
        ? <Loader />
        : error
          ? <Message variant="danger">{error}</Message>
          : (
            <Row>
              <Col md={6}>
                <Image src={product.image} alt={product.name} fluid />
              </Col>
              <Col md={3}>
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <h3>{product.name}</h3>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Rating
                      value={product.rating}
                      text={`${product.numReviews} reviews`}
                    />
                  </ListGroup.Item>
                  <ListGroup.Item>
                    Price: ${product.price}
                  </ListGroup.Item>
                  <ListGroup.Item>
                    Description: ${product.description}
                  </ListGroup.Item>
                </ListGroup>
              </Col>
              <Col md={3}>
                <Card>
                  <ListGroup variant="flush">
                    <ListGroup.Item>
                      <Row>
                        <Col>
                          Price:
                        </Col>
                        <Col>
                          <strong>${product.price}</strong>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <Row>
                        <Col>
                          Status:
                        </Col>
                        <Col>
                          {product.countInStock > 0 ? "In Stock" : "Out of stock"}
                        </Col>
                      </Row>
                    </ListGroup.Item>

                    {product.countInStock > 0 && (
                      <ListGroup.Item>
                        <Row>
                          <Col>Qty</Col>
                          <Col>
                            <Form.Control as="select" value={quantity} onChange={(e) => setQuantity(e.target.value)}>
                              {
                                [...Array(product.countInStock).keys()].map(x => <option key={x + 1} value={x + 1}>{x + 1}</option>)
                              }
                            </Form.Control>
                          </Col>
                        </Row>
                      </ListGroup.Item>
                    )}

                    <ListGroup.Item>
                      <Row>
                        <Button
                          onClick={addToCartHandler}
                          disabled={product.countInStock === 0}
                          className="btn-block"
                          type="button"

                        >
                          Add to cart
                        </Button>
                      </Row>
                    </ListGroup.Item>
                  </ListGroup>
                </Card>
              </Col>
            </Row>
          )}
    </React.Fragment>
  )
};


export default SingleProductDetailsPage;