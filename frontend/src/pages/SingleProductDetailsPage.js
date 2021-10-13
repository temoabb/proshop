import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

import { Link } from 'react-router-dom';
import { Row, Col, Image, ListGroup, Card, Button } from 'react-bootstrap';

import Rating from '../components/Rating';

const SingleProductDetailsPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState({});

  useEffect(() => {
    axios.get(`/api/products/${id}`)
      .then(res => {
        console.log(res.data);
        setProduct(res.data)
      })
      .catch(err => console.log(err))
  }, [])

  console.log('rating', product.rating)
  console.log('text', product.text)


  // const product = products.find(p => p._id === id);
  // console.log('product', product)

  return (
    <React.Fragment>
      <Link className="btn btn-light my-3" to='/'>Go Back</Link>
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
                <Button disabled={product.countInStock === 0} className="btn-block" type="button">
                  Add to cart
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </React.Fragment>
  )
};


export default SingleProductDetailsPage;