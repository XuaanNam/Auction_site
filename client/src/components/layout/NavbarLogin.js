import {Gavel, KeyboardArrowDown,
  AddShoppingCart, Person, VerifiedUser, ExitToApp, KeyboardArrowUp, FormatListBulleted,
  BorderTop, BorderLeft, BorderRight, BorderBottom } from '@material-ui/icons';
import React, { Component} from "react";
import { Form, Button} from "react-bootstrap";


class NavbarLogin extends Component {

  // Click User
  state = {
    openUserMenu: false,
    openCategory: false,
  };

  test = (e) => {
    e.target.classList.toggle("activeRotate");
  }
  handleButtonClick = (e) => {
    e.preventDefault();
    this.setState((state) => {
      return {
        openUserMenu: !state.openUserMenu,
        openCategory: false,
      };
    });
  };

  // Click Danh mục

  test = (e) => {
    e.target.classList.toggle("activeRotate");
  }
  handleButtonClick2 = (e) => {
    e.preventDefault();
    this.setState((state) => {
      return {
        openCategory: !state.openCategory,
        openUserMenu: false,
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
        openUserMenu: false,
        openCategory: false,
      });
    }
  };



  // click ra ngoài
  

  render() {
    
    return (
      <Form className="mr-5">
        <div className="containerHeader" ref={this.container}>
        {/* bổ sung danh mục */}
        {/* Xử lý search */}
        <label className="inputAllSearch input-art">
          <input type="text"  placeholder="Bạn tìm kiếm thứ gì..." className="inputSearch"></input>
          <input type="hidden"  placeholder="Bạn tìm kiếm thứ gì..." className="inputSearch"></input>
          <svg xmlns="http://www.w3.org/2000/svg" width="22" height="20" aria-hidden="true" class="mr-1 header-search-key-slash svgtoSearch"><path fill="none" stroke="#979A9C" opacity=".4" d="M3.5.5h12c1.7 0 3 1.3 3 3v13c0 1.7-1.3 3-3 3h-12c-1.7 0-3-1.3-3-3v-13c0-1.7 1.3-3 3-3z"></path><path fill="#979A9C" d="M11.8 6L8 15.1h-.9L10.8 6h1z"></path></svg>
        </label>

        {/* Xử lý chuyển hướng! */}
        <Button className="btn-nav mr-1 outLineNone" variant="outline-info" onClick={this.handleButtonClick2}>
            <FormatListBulleted className="mr-1"/>
            DANH MỤC<span></span>
            {!this.state.openCategory && (<KeyboardArrowDown className="ml-1 nonActiveRotate" />)}
            {this.state.openCategory && ( <KeyboardArrowUp className="ml-1 activeRotate" /> )}
          </Button>
          {/* Toggle */}
          {this.state.openCategory && (
            <div className="dropdownHeaderCata">
              <ul>
                <li>
                  <a href="/">
                    <Button className="btnCatalog outLineNone" variant="outline-info">
                      <BorderTop className="mr-2"/>
                      TOP
                    </Button>
                  </a>
                </li>
                <li>
                  <a href="/">
                    <Button className="btnCatalog outLineNone" variant="outline-info">
                      <BorderRight className="mr-2"/>
                      RIGHT
                    </Button>
                  </a>
                </li>
                <li>
                  <a href="/">
                    <Button className="btnCatalog outLineNone" variant="outline-info">
                      <BorderBottom className="mr-2"/>
                      BOTTOM
                    </Button>
                  </a>
                </li>
                <li>
                  <a href="/">
                    <Button className="btnCatalog outLineNone" variant="outline-info">
                      <BorderLeft className="mr-2"/>
                      LEFT
                    </Button>
                  </a>
                </li>
              </ul>
            </div>
          )}

          {/* tới phần này */}

          <a href="/interested">
            <Button className="btn-nav outLineNone" variant="outline-info">
              <Gavel className="mr-2"/>
              Quan tâm
            </Button>
          </a>
          <a href="/Cart">
            <Button className="btn-nav outLineNone" variant="outline-info">
            <AddShoppingCart className="mr-2"/>
              Đơn hàng
              
            </Button>
          </a>
          {/* USER _ HAS TOGGLE */}
          <Button className="btn-nav mr-1 outLineNone" style={{minWidth: '16vw'}} variant="outline-info" onClick={this.handleButtonClick}>
            <Person className="mr-1"/>
            <span>{this.props.user}</span>
            {!this.state.openUserMenu && (<KeyboardArrowDown className="ml-1 nonActiveRotate" />)}
            
            {this.state.openUserMenu && ( <KeyboardArrowUp className="ml-1 activeRotate" /> )}
          </Button>
          {/* Toggle */}
          {this.state.openUserMenu && (
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

export default NavbarLogin;
