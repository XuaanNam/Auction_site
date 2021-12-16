import {KeyboardArrowDown, Assignment, AddShoppingCart, Person, VerifiedUser, ExitToApp } from '@material-ui/icons';
import React, { Component} from "react";
import { Form, Button} from "react-bootstrap";


class NavbarLoginAdmin extends Component {
  state = {
    open: false,
  };

  test = (e) => {
    e.target.classList.toggle("activeRotate");
  }

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
      <Form className="mr-5">
        <div className="containerHeader" ref={this.container}>
          <a href="/admin/list">
            <Button className="btn-nav outLineNone" variant="outline-info">
              <Assignment className="mr-2"/>
              Danh sách
            </Button>
          </a>
          <a href="/admin/addproduct">
            <Button className="btn-nav outLineNone" variant="outline-info">
            <AddShoppingCart className="mr-2"/>
              Thêm sản phẩm
            </Button>
          </a>
          {/* USER _ HAS TOGGLE */}
          <Button className="btn-nav mr-1 outLineNone" variant="outline-info" onClick={this.handleButtonClick}>
            <Person className="mr-1"/>
            Xin chào, <span>{this.props.user}</span>
            {!this.state.open && (<KeyboardArrowDown className="ml-1" />)}
            
            {this.state.open && ( <KeyboardArrowDown className="ml-1 activeRotate" /> )}
          </Button>
          {/* Toggle */}
          {this.state.open && (
            <div className="dropdownHeader">
              <ul>
                <li>
                  <a href="/profile">
                    <Button className="btn-nav mr-2 outLineNone" variant="outline-info">
                      <VerifiedUser className="mr-2"/>
                      Cá nhân
                    </Button>
                  </a>
                </li>
                <li>
                  <a href="/">
                    <Button
                      className="btn-nav outLineNone"
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

export default NavbarLoginAdmin;
