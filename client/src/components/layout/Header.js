import React ,{Component} from 'react';
import NavbarLogin from './NavbarLogin';
import NavbarDefault from './NavbarDefault';
import '../../App.css';
import {BrowserRouter as Route, Link} from 'react-router-dom';
import {Navbar,Nav,Form,FormControl,Button, Container, Image} from 'react-bootstrap';
import logo from '../images/Logo.png'
import {useEffect} from "react";
import axios from "../../api/axios"; 
import Cookies from "universal-cookie";


class Header extends Component{

    handleLogout = (e) => {
        e.preventDefault(e);
        const cookies = new Cookies();
        cookies.remove("userAuth");
        cookies.remove("userid");
        cookies.remove("username");
        window.location.reload(false);
    }
    
    render(){
        return (
            <div>
                <Navbar className="header" style={{position: "fixed", top: "0", left: "0", right: "0", zIndex: "2"}} bg="dark" variant="dark">
                    
                    <Nav className="mr-auto">
                        <a href="/home">
                            <img className="logo-header ml-5" src={logo}  rounded />
                        </a>
                        <Nav.Link href="/home" className="ml-2">Trang chủ</Nav.Link>
                    </Nav>

                    {this.props.isActive ? <NavbarLogin handleLogout={this.handleLogout}/> : <NavbarDefault/>}
        
                </Navbar>
            </div>
        )
    }
}

export default Header;