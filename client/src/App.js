// import logo from './logo.svg';
import React from 'react';
import './App.css';
import Navbar from './components/Navbar'; 
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/pages/Home'; 
import Services from './components/pages/Services';
import Products from './components/pages/Products';
import Register from './components/pages/Register';
import Login from './components/pages/Login';
import Header from './components/Navbar'
import Footer from './components/Footer';
import Body from './components/body';

function App() {
  return (
    <div className="App">
      <div>
      <Header/>
      {/* <Body/> */}
        <Router>
          <Routes>
            <Route path='/' exact element={<Home/>} />
            <Route path='/services' element={<Services/>} />
            <Route path='/products' element={<Products/>} />
            <Route path='/register' element={<Register/>} />
            <Route path='/login' element={<Login/>} />
          </Routes>
        </Router>
      </div>
    </div>
  );
}

export default App;
