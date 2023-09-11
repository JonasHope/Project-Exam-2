import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Home from './pages/Home';
import Venues from './pages/Venues';
import Venue from './pages/Venue';

function App() {
  return (
    <BrowserRouter>
      <Header/>
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/Venues" element={<Venues />}/>
        <Route path="/Venue/:id" element={<Venue />}/>
      </Routes>
      <Footer/>
    </BrowserRouter>
  );
}

export default App;
