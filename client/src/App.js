// import logo from './logo.svg';
import React from 'react';
import './App.css';
import Navbar from './components/Navbar'; 
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/pages/Home'; 
import Services from './components/pages/Services';
import Products from './components/pages/Products';
import SignUp from './components/pages/SignUp';
import Footer from './components/Footer';
import Body from './components/body';

function App() {
  return (
    <div className="App">
      <div>
      <Navbar/>
      <Body/>
        <Router>
          <Routes>
            <Route path='/' exact element={<Home/>} />
            <Route path='/services' element={<Services/>} />
            <Route path='/products' element={<Products/>} />
            <Route path='/sign-up' element={<SignUp/>} />
          </Routes>
        </Router>
      </div>
    </div>
  );
}

export default App;
