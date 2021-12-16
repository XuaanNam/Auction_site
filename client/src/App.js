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
import Interested from './components/pages/Interested';
import AddProduct from './components/pages/Admin/AddProduct';
import List from './components/pages/Admin/List';
import AddAuction from './components/pages/Admin/AddAuction';
import PaymentSuccess from './components/pages/Cart/PaymentSuccess';


function App() {
  return (
    <div className="App">
      <div>
        <Router>
          <Routes>
            <Route path='/' exact element={<HomePage/>} />
            <Route path='/register' element={<Register/>} />
            <Route path='/login' element={<Login/>} />
            <Route path='/auction/:id' element={<Auction/>} />
            <Route path='/home' exact element={<Home/>} />
            <Route path='/interested' exact element={<Interested/>} />          
            <Route path='/cart' exact element={<Cart/>} />
            <Route path='/profile' element={<Profile/>} />
            <Route path='/admin/addproduct' element={<AddProduct/>} />
            <Route path='/admin/list' element={<List/>} />
            <Route path='/admin/addauction/:id' element={<AddAuction/>} />
            <Route path='/payment-success' element={<PaymentSuccess/>} />
          </Routes>
        </Router>
      </div>
    </div>
  );
}

export default App;
