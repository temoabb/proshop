import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

import FormContainer from '../components/FormContainer';
import Message from '../components/Message';
import Loader from '../components/Loader';

import { register } from '../actions/userActions';


const RegisterPage = ({ location, history }) => {
  console.log('RegisterPage');

  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState(null);


  const dispatch = useDispatch();

  const userRegister = useSelector(state => state.userRegister);

  const { loading, error, userInfo } = userRegister;
  // console.log(loading, error, userInfo);

  const redirect = location.search ? location.search.split("=")[1] : '/';

  useEffect(() => {
    console.log('RegisterPage effect');

    if (userInfo) {
      console.log(`loginPage effect > We have got userInfo, so we'll redirect to ${redirect}`);
      history.push(redirect);
    }

  }, [history, userInfo, redirect]);


  const submitHandler = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setMessage('Passwords do not match!')
    } else {
      dispatch(register(name, email, password));
    }
  };

  return (
    <FormContainer>
      <h1>Sign up</h1>

      {message && <Message variant="danger">{message}</Message>}
      {error && <Message variant="danger">{error}</Message>}
      {loading && <Loader />}

      <Form onSubmit={submitHandler}>

        <Form.Group controlId="email">
          <Form.Label>
            Name
          </Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={e => setName(e.target.value)}>
          </Form.Control>
        </Form.Group>

        <Form.Group controlId="confirmEmail">
          <Form.Label>
            Email address
          </Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={e => setEmail(e.target.value)}>
          </Form.Control>
        </Form.Group>

        <Form.Group controlId="password">
          <Form.Label>
            Password
          </Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={e => setPassword(e.target.value)}>
          </Form.Control>
        </Form.Group>

        <Form.Group controlId="confirmPassword">
          <Form.Label>
            Confirm Password
          </Form.Label>
          <Form.Control
            type="password"
            placeholder="Confirm password"
            value={confirmPassword}
            onChange={e => setConfirmPassword(e.target.value)}>
          </Form.Control>
        </Form.Group>

        <Button className="my-2" type="submit" variant="primary">Register</Button>
      </Form>

      <Row className="py-3">
        <Col>
          Already have an account? <Link to={redirect ? `/login?redirect=${redirect}` : '/login'}>Login</Link>
        </Col>
      </Row>
    </FormContainer>
  )
};

export default RegisterPage;