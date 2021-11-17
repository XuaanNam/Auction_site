import React from 'react';
import '../App.css';
import {BrowserRouter as Route, Link} from 'react-router-dom';
import {Navbar,Nav,Form,FormControl,Button, Container, Image} from 'react-bootstrap';
import logo from '../images/logo.png'

function Header() {
    return (
                <div><Navbar className="header" bg="dark" variant="dark">
                    <a href="/">
                        <img className="logo-header ml-5" src={logo}  rounded />
                    </a>
                    <Nav className="mr-auto">
                    <Nav.Link href="/" className="ml-2">Trang chủ</Nav.Link>
                    </Nav>
                <div>
                    <a href="#">
                            <Button className="btn-nav mr-2" variant="outline-info">Đấu giá</Button>
                    </a>
                    <a href="/Cart">
                            <Button className="btn-nav mr-2" variant="outline-info">Giỏ hàng</Button>
                    </a>
                </div>
                <Form inline className="mr-5">
                    
                    <Form inline className="mr-5">
                    <a href="/login">
                        <Button className="btn-nav mr-2" variant="outline-info">Đăng nhập</Button>
                    </a>
                    <a href="/register">
                        <Button className="btn-nav" variant="outline-info">Đăng ký</Button>
                    </a>
                    </Form>
                </Form>
            </Navbar>
        </div>
    )
}
export default Header;