import React from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import { Container } from 'react-bootstrap';
import HomePage from './pages/HomePage';

const App = () => {
  return (
    <React.Fragment>
      <Header />
      <main className="py-3">
        <Container>
          <HomePage />
        </Container>
      </main>
      <Footer />
    </React.Fragment>
  )
};


export default App;