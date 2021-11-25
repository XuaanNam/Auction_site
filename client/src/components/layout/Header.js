import React ,{Component} from 'react';
import NavbarDefault from './NavbarDefault';
import NavbarLogin from './NavbarLogin';
import NavbarLoginAdmin from './NavbarLoginAdmin';
import '../../App.css';
import {Navbar,Nav} from 'react-bootstrap';
import logo from '../images/Logo.png'
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

                    {this.props.isActive ? <NavbarLoginAdmin handleLogout={this.handleLogout}/> : <NavbarDefault/>}
        
                </Navbar>
            </div>
        )
    }
}

export default Header;