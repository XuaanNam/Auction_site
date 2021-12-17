import React ,{Component} from 'react';
import NavbarDefault from './NavbarDefault';
import NavbarLogin from './NavbarLogin';
import NavbarLoginAdmin from './NavbarLoginAdmin';
import '../assets/Header.css';
import {Navbar,Nav} from 'react-bootstrap';
import logo from '../images/Logo.png';
import Cookies from "universal-cookie";
const cookies = new Cookies();
const user = cookies.get('username') ? cookies.get('username'): "null";

class Header extends Component{
    state = {
        user: user
    }

    handleLogout = (e) => {
        e.preventDefault(e);
        cookies.remove("userAuth", {
            path: "/",
            maxAge: 500,
        });
        cookies.remove("username",{
            path: "/",
            maxAge: 500,
        });
        setTimeout(()=>{
            window.location.reload(false);
        }, 500) ;
    }
   
    render(){
        return (
            <div>
                <Navbar className="header" style={{position: "fixed", top: "0", left: "0", right: "0", zIndex: "2"}} bg="dark" variant="dark">
                    

                    {this.props.isAdmin? 
                        <Nav className="mr-2">
                         
                            <img className="logo-header ml-5" src={logo} alt="logo gray panther" />
                          
                        </Nav>
                    : 
                        <Nav className="mr-2">
                            <a href="/home">
                                <img className="logo-header ml-5" src={logo} alt="logo gray panther" />
                            </a>
                            <Nav.Link href="/home" className="ml-2">Trang chủ</Nav.Link>
                        </Nav>
                    }
                    
                    {this.props.isAdmin && <NavbarLoginAdmin handleLogout={this.handleLogout} user={this.state.user}/>}
                    {this.props.isActive && <NavbarLogin coudldSearch={this.props.coudldSearch} handleSearch={this.props.handleSearch} onChange={this.props.onChange} handleLogout={this.handleLogout} user={this.state.user}/>}
                    {this.props.isGuest && <NavbarDefault/>}

                </Navbar>
            </div>
        )
    }
}

export default Header;