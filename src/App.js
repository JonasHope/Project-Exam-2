import React from 'react';
import { BrowserRouter } from 'react-router-dom'
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Home from './pages/Home';

function App() {
  return (
    <BrowserRouter>
      <Header/>
      <Home/>
      <Footer/>
    </BrowserRouter>
  );
}

export default App;
