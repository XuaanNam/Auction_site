import {Gavel, KeyboardArrowDown,AddShoppingCart, Person, VerifiedUser, ExitToApp, KeyboardArrowUp, FormatListBulleted,
  BorderTop, BorderLeft, BorderRight, BorderBottom, Search } from '@material-ui/icons';
import React, { Component} from "react";
import { Form, Button, InputGroup, FormControl} from "react-bootstrap";

class NavbarLogin extends Component {

  // Click User
  state = {
    openUserMenu: false,
    openCategory: false,
    search: '',
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

  handleChange = (e) => {
    this.setState({ search: e.target.value }, () => {
      if (this.props.onChange) {
        this.props.onChange(this.state.search);
      }
    })
  };

  // click ra ngoài


  render() {
    return (
      <div className="containerHeader d-flex" ref={this.container}>
        {this.props.coudldSearch &&
          <Form className="form-search">
            <InputGroup className="" style={{marginRight: "5vh"}}>
              <FormControl
                type="text"
                ref={this.input}
                placeholder="Tìm kiếm game đấu giá ..."
                aria-label="Recipient's username"
                aria-describedby="basic-addon2"
                value={this.state.search}
                onChange={this.handleChange}
              />
              <Button variant="outline-secondary" onClick={this.props.handleSearch} id="button-addon2" type="submit">
                <small><Search/></small>
              </Button>
            </InputGroup>
          </Form> 
        }
        <Form className="form-links">
          <a href="/interested" className="mr-4">
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
                    <Button className="btn-nav mr-2 outLineNone w-100" variant="outline-info">
                      <VerifiedUser className="mr-2"/>
                      Cá nhân
                    </Button>
                  </a>
                </li>
                <li>
                  <a href="/">
                    <Button
                      className="btn-nav outLineNone w-100"
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
        </Form>
      </div>
    );
  }
}

export default NavbarLogin;
