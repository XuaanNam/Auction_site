import {PersonAdd, MeetingRoom, Search} from '@material-ui/icons';
import React, { Component } from "react";
import { Form, Button, InputGroup, FormControl} from "react-bootstrap";

class NavbarDefault extends Component {
    state = {
        search: '',
      };
    handleChange = (e) => {
        this.setState({ search: e.target.value }, () => {
        if (this.props.onChange) {
            this.props.onChange(this.state.search);
        }
        })
    };
    render() {
        return (
            <div className="containerHeader d-flex">
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
            <Form className="mr-5 containerHeader">
                <a href="/login">
                    <Button className="btn-nav mr-2 outLineNone" variant="outline-info">
                       <MeetingRoom className="mr-2 mb-1"/>
                        Đăng nhập
                    </Button>
                </a>
                <a href="/register">
                    <Button className="btn-nav  outLineNone" variant="outline-info">
                        <PersonAdd className="mr-2 mb-1"/>
                        Đăng ký
                    </Button>
                </a>
            </Form>
            </div>

        )
    }
}

export default NavbarDefault;
