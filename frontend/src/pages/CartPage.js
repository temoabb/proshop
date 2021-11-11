import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Row, Col, ListGroup, Image, Form, Button, Card } from 'react-bootstrap';
import { addToCart, removeFromCart } from '../actions/cartActions';

import Message from '../components/Message';

const CartPage = ({ match, location, history }) => {
  console.log('rerender CartPage');

  const dispatch = useDispatch();
  const cart = useSelector(state => state.cart);
  const { cartItems } = cart;

  const productId = match.params.id; // for ex: 6169373cc36aa100fde842d7

  const quantity = location.search ? Number(location.search.split("=")[1]) : 1; // ?qty=7 > ["?qty", "7"]

  useEffect(() => {
    console.log('effect CartPage');

    if (productId) {
      dispatch(addToCart(productId, quantity))
    };

  }, [dispatch, productId, quantity])

  const removeFromCartHandler = (id) => dispatch(removeFromCart(id));
  const checkoutHandler = () => history.push('/login?redirect=shipping');

  return (
    <Row>
      <Col md={8}>
        <h1>Shopping Cart</h1>

        {
          cartItems.length === 0 ? (
            <Message>Your cart is empty<Link to="/">Go Back</Link></Message>
          ) : (
            <ListGroup variant="flush">
              {cartItems.map(item => (
                <ListGroup.Item key={item.product}>
                  <Row>
                    <Col md={2}>
                      <Image src={item.image} alt={item.name} fluid rounded></Image>
                    </Col>
                    <Col md={3}>
                      <Link to={`/products/${item.product}`}>{item.name}</Link>
                    </Col>
                    <Col md={2}>
                      ${item.price}
                    </Col>
                    <Col md={2}>
                      <Form.Control
                        as="select"
                        value={item.quantity}
                        onChange={(e) => dispatch(addToCart(item.product, Number(e.target.value)))}
                      >
                        {
                          [...Array(item.countInStock).keys()].map(x => <option key={x + 1} value={x + 1}>{x + 1}</option>)
                        }
                      </Form.Control>
                    </Col>
                    <Col md={2}>
                      <Button
                        type="button"
                        variant="light"
                        onClick={() => removeFromCartHandler(item.product)}>
                        <i className="fas fa-trash"></i>
                      </Button>
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}
            </ListGroup>
          )
        }
      </Col>
      <Col md={4}>
        <Card>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>Subtotal ({cartItems.reduce((acc, item) => acc + item.quantity, 0)}) items</h2>
              ${cartItems
                .reduce((acc, item) => acc + item.price * item.quantity, 0)
                .toFixed(2)}
            </ListGroup.Item>
            <ListGroup.Item>
              <Row>
                <Button
                  type="button"
                  className="btn-block"
                  disabled={cartItems.length === 0}
                  onClick={checkoutHandler}>
                  Proceed to checkout
                </Button>
              </Row>
            </ListGroup.Item>
          </ListGroup>
        </Card>
      </Col>
    </Row>
  )
};

export default CartPage;