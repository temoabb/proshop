import React, { useState } from 'react';
import { Form, Button, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import FormContainer from '../components/FormContainer';
import { savePaymentMethod } from '../actions/cartActions';
import CheckoutSteps from '../components/CheskoutSteps';

const PaymentPage = ({ history }) => {
  console.log('Payment page');

  const cart = useSelector(state => state.cart);
  const { shippingAddress } = cart;

  const [paymentMethod, setPaymentMethod] = useState('PayPal');
  const dispatch = useDispatch();

  if (!shippingAddress) {
    history.push('/shipping');
  }

  const submitHandler = (e) => {
    e.preventDefault();

    dispatch(savePaymentMethod({ paymentMethod }));
    history.push('/placeorder');
  };

  return (
    <FormContainer>
      <CheckoutSteps step1 step2 step3 />
      <h1>Payment Method</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group>
          <Form.Label as="legend">
            Select Method
          </Form.Label>
          <Col>
            <Form.Check
              type="radio"
              label="PayPal or Credit Cart"
              id="PayPal"
              name="paymentMethod"
              value={paymentMethod}
              checked
              onChange={(e) => setPaymentMethod(e.target.value)}>
            </Form.Check>
            {/* <Form.Check
              type="radio"
              label="Stripe"
              id="Stripe"
              name="paymentMethod"
              value="Stripe"
              checked
              onChange={(e) => setPaymentMethod(e.target.value)}>
            </Form.Check> */}
          </Col>
        </Form.Group>
        <Button className="my-2" type="submit" variant="primary">Continue</Button>
      </Form>
    </FormContainer>
  )
};

export default PaymentPage;