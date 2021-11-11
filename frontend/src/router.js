import React from 'react';
import { Route, Switch } from 'react-router-dom';

import HomePage from './pages/HomePage';
import SingleProductDetailsPage from './pages/SingleProductDetailsPage';
import CartPage from './pages/CartPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';

const routes = [
  {
    path: '/',
    exact: true,
    component: HomePage, // all products
    _id: "r1"
  },
  {
    path: '/home',
    component: HomePage,
    _id: "r2"
  },
  {
    path: '/product/:id',
    component: SingleProductDetailsPage,
    _id: "r3"
  },
  {
    path: '/cart/:id?',
    component: CartPage,
    _id: "r4"
  },
  {
    path: '/login',
    component: LoginPage,
    _id: "r5",
  },
  {
    path: '/register',
    component: RegisterPage,
    _id: "r6",
  }
];

const AppRouter = () => {
  return (
    <Switch>
      {routes.map(route => <Route key={route._id} {...route} />)}
    </Switch>
  )
};


export default AppRouter;



