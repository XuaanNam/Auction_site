import React, { Component } from "react";
import "../../App.css";
import { Form, Button} from "react-bootstrap";

class NavbarLogin extends Component {
  render() {
    return (
      <Form inline className="mr-5">
        <a href="/profile">
          <Button className="btn-nav mr-2" variant="outline-info">
            Cá nhân
          </Button>
        </a>
        <a href="/interested">
          <Button className="btn-nav mr-2" variant="outline-info">
<<<<<<< HEAD
            Thanh toán
=======
            Quan tâm
>>>>>>> 25328ca38f09e2099cc288c942ba519422f26d9b
          </Button>
        </a>
        <a href="/Cart">
          <Button className="btn-nav mr-2" variant="outline-info">
            Giỏ hàng
          </Button>
        </a>
        <a href="/">
          <Button
            className="btn-nav"
            variant="outline-info"
            onClick={this.props.handleLogout}
          >
            Đăng xuất
          </Button>
        </a>
      </Form>
    );
  }
}

export default NavbarLogin;
