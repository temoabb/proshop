import axios from "axios";

import {
  USER_DETAILS_FAIL,
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_UPDATE_PROFILE_REQUEST,
  USER_UPDATE_PROFILE_SUCCESS
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

export const logout = () => (dispatch) => {
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



export const getUserDetails = id => async (dispatch, getState) => {
  try {
    const { userLogin: { userInfo } } = getState();
    dispatch({ type: USER_DETAILS_REQUEST });
    const config = {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${userInfo.token}`,
      }
    };
    const { data } = await axios.get(`/api/users/${id}`, config);
    dispatch({
      type: USER_DETAILS_SUCCESS,
      payload: data
    })
  } catch (error) {
    dispatch({
      type: USER_DETAILS_FAIL,
      payload: error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    })
  }
};


export const updateUserProfile = user => async (dispatch, getState) => {
  try {
    const { userLogin: { userInfo } } = getState(); // getState is a function
    dispatch({ type: USER_UPDATE_PROFILE_REQUEST });
    const config = {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${userInfo.token}`,
      }
    };

    const { data } = await axios.put(`/api/users/profile`, user, config); // user is a data we want to save
    console.log('data', data);

    dispatch({
      type: USER_UPDATE_PROFILE_SUCCESS,
      payload: data
    })

  } catch (error) {
    dispatch({
      type: USER_DETAILS_FAIL,
      payload: error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    })
  }
};