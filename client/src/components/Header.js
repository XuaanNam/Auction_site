import React from 'react';
import '../App.css';
import {BrowserRouter as Route, Link} from 'react-router-dom';
import {Navbar,Nav,Form,FormControl,Button, Container} from 'react-bootstrap';

function Header() {
    return (
        <div>
            <Navbar bg="dark" variant="dark">
                <Navbar.Brand className="Brand ml-5" href="/">Logo</Navbar.Brand>
                <Nav className="mr-auto">
                <Nav.Link href="/">Trang chủ</Nav.Link>
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