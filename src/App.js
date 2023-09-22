import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Home from './pages/Home';
import Venues from './pages/Venues';
import Venue from './pages/Venue';
import ProfilePage from './pages/Profile';
import CreateVenue from './pages/CreateVenue';

function App() {
  return (
    <BrowserRouter>
      <Header/>
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/Venues" element={<Venues />}/>
        <Route path="/Venue/:id" element={<Venue />}/>
        <Route path="/Profile" element={<ProfilePage />}/>
        <Route path="/CreateVenue" element={<CreateVenue />} />
      </Routes>
      <Footer/>
    </BrowserRouter>
  );
}

export default App;
