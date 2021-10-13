import React from 'react';
import { Route, Switch } from 'react-router-dom';

import HomePage from './pages/HomePage';
import SingleProductDetailsPage from './pages/SingleProductDetailsPage';

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
  }
]

const AppRouter = () => {
  return (
    <Switch>
      {routes.map(route => <Route key={route._id} {...route} />)}
    </Switch>
  )
};


export default AppRouter;



