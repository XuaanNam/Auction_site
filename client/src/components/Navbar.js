import React from 'react';
import '../App.css';
import {BrowserRouter as Route, Link} from 'react-router-dom';
import {Navbar,Nav,Form,FormControl,Button, Container } from 'react-bootstrap';

function Header() {
    return (
        <div>
            <Navbar bg="dark" variant="dark">
                <Navbar.Brand className="Brand ml-5" href="/">The Auction</Navbar.Brand>
                <Nav className="mr-auto">
                <Nav.Link href="/">Home</Nav.Link>
                </Nav>
                <Form inline className="mr-5">
                <a href="/login">
                    <Button className="btn-nav mr-2" variant="outline-info">Sign In</Button>
                </a>
                <a href="/register">
                    <Button className="btn-nav" variant="outline-info">Sign Up</Button>
                </a>
                </Form>
            </Navbar>
        
        </div>
    )
}
export default Header;