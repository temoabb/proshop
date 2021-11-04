import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux';

import { Row, Col, ListGroup, Image, Form, Button, Cart } from 'react-bootstrap';

import { addToCart } from '../actions/cartActions';

const CartPage = ({ match, location, history }) => {
  const dispatch = useDispatch();

  const productId = match.params.id; // for ex: 6169373cc36aa100fde842d7
  // const { search } = useLocation(); // same as location.search;

  const quantity = location.search ? Number(location.search.split("=")[1]) : 1; // ?qty=7 : after split ["?qty", "7"]

  useEffect(() => {
    console.log('effect CartPage');
    if (productId) dispatch(addToCart(productId, quantity));
  }, [dispatch, productId, quantity])


  return <h1>CartPage</h1>
};

export default CartPage;