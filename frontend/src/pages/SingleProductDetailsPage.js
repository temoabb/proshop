import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
// router
import { useParams, Link } from 'react-router-dom';
// bootstrap
import { Row, Col, Image, ListGroup, Card, Button } from 'react-bootstrap';
// actions
import { listProductDetails } from '../actions/productActions';
// UI 
import Loader from '../components/Loader';
import Message from '../components/Message';
import Rating from '../components/Rating';


const SingleProductDetailsPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const productDetails = useSelector(state => state.productDetails);
  const { error, loading, product } = productDetails;

  useEffect(() => {
    dispatch(listProductDetails(id));
  }, [])


  return (
    <React.Fragment>
      <Link className="btn btn-light my-3" to='/'>Go Back</Link>
      {loading
        ? <Loader />
        : error
          ? <Message></Message>
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
                    <ListGroup.Item>
                      <Row>
                        <Button disabled={product.countInStock === 0} className="btn-block" type="button">
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