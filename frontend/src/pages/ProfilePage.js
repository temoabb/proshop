import React, { useState, useEffect } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { getUserDetails } from '../actions/userActions';


const ProfilePage = ({ location, history }) => {
  console.log('ProfilePage');

  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState(null);

  const dispatch = useDispatch();

  const userDetails = useSelector(state => state.userDetails);
  const { loading, error, user } = userDetails;
  console.log('user', user);

  const userLogin = useSelector(state => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    console.log('useEffect ProfilePage');
    console.log('userInfo', userInfo);

    if (!userInfo) {
      history.push('/login');
    } else {
      if (!user.name) {
        console.log('here')
        dispatch(getUserDetails('profile'));
      } else {
        setName(user.name);
        setEmail(user.email);
      }
    }
  }, [dispatch, history, userInfo, user]);


  const submitHandler = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setMessage('Passwords do not match!')
    } else {
      // DISPATCH UPDATE PROFILE
    }
  };

  return (
    <Row>
      <Col md={3}>
        <h2>User profile </h2>

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

          <Button className="my-2" type="submit" variant="primary">Update</Button>
        </Form>
      </Col>
      <Col md={9}>
        <h2>My orders</h2>
      </Col>
    </Row>
  )
};

export default ProfilePage;