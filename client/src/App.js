// import logo from './logo.svg';
import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/pages/Home'; 
import Register from './components/pages/Register';
import Login from './components/pages/Login';
import Auction from './components/pages/Auction';
import HomePage from './components/pages/HomePage';
import Cart from './components/pages/Cart';
import Profile from './components/pages/Profile';
import Changepass from './components/pages/ChangePass';


function App() {
  return (
    <div className="App">
      <div>
        <Router>
          <Routes>
            <Route path='/' exact element={<HomePage/>} /> 
            <Route path='/register' element={<Register/>} />
            <Route path='/login' element={<Login/>} />
            <Route path='/auction' element={<Auction/>} />
            <Route path='/home' exact element={<Home/>} />         
            <Route path='/cart' element={<Cart/>} />
            <Route path='/profile' element={<Profile/>} />
            <Route path='/changepass' element={<Changepass/>} />
          </Routes>
        </Router>
      </div>
    </div>
  );
}

export default App;
