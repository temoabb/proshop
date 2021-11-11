import axios from "axios";

import {
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS
} from "../constants/userConstants"


export const login = (email, password) => async (dispatch) => {
  console.log('in login action');

  try {
    dispatch({
      type: USER_LOGIN_REQUEST
    })

    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    }

    const { data } = await axios.post('/api/users/login', { email, password }, config); // ./userControllers/authUser
    console.log('data', data);

    // above returns this:
    // res.json({
    //   _id: user._id,
    //   name: user.name,
    //   email: user.email,
    //   isAdmin: user.isAdmin,
    //   token: generateToken(user._id),
    // })

    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data,
    })

    localStorage.setItem('userInfo', JSON.stringify(data));

  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAIL,
      payload: error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    })
  }
};

export const logouot = () => (dispatch) => {
  localStorage.removeItem('userInfo');
  dispatch({ type: USER_LOGOUT });
};

export const register = (name, email, password) => async dispatch => {
  try {
    dispatch({ type: USER_REGISTER_REQUEST }); // /api/users
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };

    const { data } = await axios.post('/api/users', { name, email, password }, config);

    dispatch({ type: USER_REGISTER_SUCCESS, payload: data });
    dispatch({ type: USER_LOGIN_SUCCESS, payload: data });

  } catch (error) {
    dispatch({
      type: USER_REGISTER_FAIL,
      payload: error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    })
  }
};