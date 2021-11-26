import React ,{Component} from 'react';
import NavbarDefault from './NavbarDefault';
import NavbarLogin from './NavbarLogin';
import NavbarLoginAdmin from './NavbarLoginAdmin';
import '../assets/Header.css';
import {Navbar,Nav} from 'react-bootstrap';
import logo from '../images/Logo.png';
import Cookies from "universal-cookie";

class Header extends Component{
 
    handleLogout = (e) => {
        e.preventDefault(e);
        const cookies = new Cookies();

        cookies.remove("userAuth");
        cookies.remove("username");
        setTimeout(()=>{
            window.location.reload(false);
        }, 100) ;
    }
    render(){
        return (
            <div>
                <Navbar className="header" style={{position: "fixed", top: "0", left: "0", right: "0", zIndex: "2"}} bg="dark" variant="dark">
                    

                    {this.props.isAdmin? 
                        <Nav className="mr-auto">
                         
                            <img className="logo-header ml-5" src={logo} alt="logo gray panther" />
                          
                        </Nav>
                    : 
                        <Nav className="mr-auto">
                            <a href="/home">
                                <img className="logo-header ml-5" src={logo} alt="logo gray panther" />
                            </a>
                            <Nav.Link href="/home" className="ml-2">Trang chủ</Nav.Link>
                        </Nav>
                    }
                    
                    {this.props.isAdmin ? <NavbarLoginAdmin handleLogout={this.handleLogout}/> : <span></span>}
                    {this.props.isActive ? <NavbarLogin handleLogout={this.handleLogout}/> : <span></span>}
                    {this.props.isGuest ? <NavbarDefault/> : <span></span>}
        
                </Navbar>
            </div>
        )
    }
}

export default Header;