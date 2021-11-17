// import logo from './logo.svg';
import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home'; 
import Register from './components/Register';
import Login from './components/Login';
import Auction from './components/Auction';
import HomePage from './components/HomePage';
import Cart from './components/Cart';
import Profile from './components/Profile';
import Changepass from './components/ChangePass';


function App() {
  return (
    <div className="App">
      <div>
        <Router>
          <Routes>
            {/* <Route path='/' exact element={<HomePage/>} /> */}
            <Route path='/register' element={<Register/>} />
            <Route path='/login' element={<Login/>} />
            <Route path='/auction' element={<Auction/>} />
            <Route path='/' exact element={<Home/>} />         
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
