import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import AppRouter from './router';

import Header from './components/Header';
import Footer from './components/Footer';


const App = () => {
  return (
    <Router>
      <Header />
      <main className="py-3">
        <Container>
          <AppRouter />
        </Container>
      </main>
      <Footer />
    </Router>
  )
};


export default App;