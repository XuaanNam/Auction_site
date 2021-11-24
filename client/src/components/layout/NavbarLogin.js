import {Gavel, KeyboardArrowDown, ShoppingCartOutlined,
  AccountBalanceWallet, AddShoppingCart, Person, VerifiedUser, ExitToApp } from '@material-ui/icons';
import React, { Component} from "react";
import styled from 'styled-components';
import "../../App.css";
import { Form, Button} from "react-bootstrap";
import HeaderD from '../assets/Header.module.css'

class NavbarLogin extends Component {
  
  test = (e) => {
    e.target.classList.toggle("activeRotate");
  }

  state = {
    open: false,
  };
  handleButtonClick = (e) => {
    e.preventDefault();
    this.setState((state) => {
      return {
        open: !state.open,
      };
    });
  };

  // click ra ngoài
  container = React.createRef();
  state = {
    open: false,
  };
  // 
  componentDidMount() {
    document.addEventListener("mousedown", this.handleClickOutside);
  }
  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleClickOutside);
  }

 
  handleClickOutside = (event) => {
    if (
      this.container.current &&
      !this.container.current.contains(event.target)
    ) {
      this.setState({
        open: false,
      });
    }
  };
  
  

  render() {

  

    return (
      <Form inline className="mr-5">
        <div className="containerHeader" ref={this.container}>
          <a href="/interested">
            <Button className={`btn-nav ${HeaderD.outLineNone}`} variant="outline-info">
              <Gavel className="mr-2"/>
              Quan tâm
            </Button>
          </a>
          <a href="/Cart">
            <Button className={`btn-nav ${HeaderD.outLineNone}`} variant="outline-info">
            <ShoppingCartOutlined className="mr-2"/>
              Giỏ hàng
              
            </Button>
          </a>
          {/* USER _ HAS TOGGLE */}
          <Button type="headerBtnLogin" className={`headerBtnLogin btn-nav mr-1 ${HeaderD.outLineNone}`} style={{minWidth: '20vw'}} variant="outline-info" onClick={this.handleButtonClick}>
            <Person className="mr-1"/>
            Xin chào, User <span>LUCIFER</span>
            {!this.state.open && (<KeyboardArrowDown className={`ml-1`} />)}
            
            {this.state.open && ( <KeyboardArrowDown className={`ml-1 ${HeaderD.activeRotate}`} /> )}
          </Button>
          {/* Toggle */}
          {this.state.open && (
            <div className={HeaderD.dropdownHeader}>
              <ul>
                <li>
                  <a href="/profile">
                    <Button className={`btn-nav mr-2 ${HeaderD.outLineNone}`} variant="outline-info">
                      <VerifiedUser className="mr-2"/>
                      Cá nhân
                    </Button>
                  </a>
                </li>
                <li>
                  <a href="/#">
                    <Button className={`btn-nav mr-2 ${HeaderD.outLineNone}`} variant="outline-info">
                      <AddShoppingCart className="mr-2"/>
                      Đơn hàng
                    </Button>
                  </a>
                </li>
                <li>
                  <a href="/">
                    <Button
                      className={`btn-nav ${HeaderD.outLineNone}`}
                      variant="outline-info"
                      onClick={this.props.handleLogout}
                    >
                      <ExitToApp className="mr-2"/>
                      Đăng xuất
                    </Button>
                  </a>
                </li>
              </ul>
            </div>
          )}
        </div>
      </Form>
    );
  }
}

const Hr = styled.hr`
    background-color: #fff;
    border: none;
    height: 1px;
`;

export default NavbarLogin;
