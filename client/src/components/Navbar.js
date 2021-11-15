import React from 'react';
import '../App.css';
import {Navbar,Nav,Form,FormControl,Button, Container } from 'react-bootstrap';

function Footer() {
    return (
        <div>
            <Navbar bg="dark" variant="dark">
                <Navbar.Brand className="Brand ml-5" href="#home">Banner Auction</Navbar.Brand>
                <Nav className="mr-auto">
                <Nav.Link href="#home">Trang chủ</Nav.Link>
                </Nav>
                <Form inline className="mr-5">
                <Button className="btn-nav mr-2" variant="outline-info">Đăng nhập</Button>
                <Button className="btn-nav" variant="outline-info">Đăng ký</Button>
                </Form>
            </Navbar>
        
        </div>
    )
}
export default Footer;