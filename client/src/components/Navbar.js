import React from 'react';
import '../App.css';
import {Navbar,Nav,Form,FormControl,Button, Container } from 'react-bootstrap';

function Footer() {
    return (
        <div>
            <Navbar bg="dark" variant="dark">
                <Navbar.Brand className="Brand ml-5" href="#home">Navbar</Navbar.Brand>
                <Nav className="mr-auto">
                <Nav.Link href="#home">Home</Nav.Link>
                </Nav>
                <Form inline className="mr-5">
                <Button className="btn-nav mr-2" variant="outline-info">Sign In</Button>
                <Button className="btn-nav" variant="outline-info">Sign Up</Button>
                </Form>
            </Navbar>
        
        </div>
    )
}
export default Footer;