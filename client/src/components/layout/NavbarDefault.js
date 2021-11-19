import React, { Component } from "react";
import "../../App.css";
import { Form, Button} from "react-bootstrap";

class NavbarDefault extends Component {
    render() {
        return (
            <Form inline className="mr-5">
                <a href="/login">
                    <Button className="btn-nav mr-2" variant="outline-info">Đăng nhập</Button>
                </a>
                <a href="/register">
                    <Button className="btn-nav" variant="outline-info">Đăng ký</Button>
                </a>
            </Form>
        )
    }
}

export default NavbarDefault;
