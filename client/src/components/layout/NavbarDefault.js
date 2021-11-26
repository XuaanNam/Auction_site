import {PersonAdd, MeetingRoom} from '@material-ui/icons';
import React, { Component } from "react";
import "../../App.css";
import { Form, Button} from "react-bootstrap";
import HeaderD from '../assets/Header.module.css'

class NavbarDefault extends Component {
    render() {
        return (
            <Form className="mr-5">
                <a href="/login">
                    <Button className={`btn-nav mr-2 ${HeaderD.outLineNone}`} variant="outline-info">
                       <MeetingRoom className="mr-2 mb-1"/>
                        Đăng nhập
                    </Button>
                </a>
                <a href="/register">
                    <Button className={`btn-nav  ${HeaderD.outLineNone}`} variant="outline-info">
                        <PersonAdd className="mr-2 mb-1"/>
                        Đăng ký
                    </Button>
                </a>
            </Form>
        )
    }
}

export default NavbarDefault;
