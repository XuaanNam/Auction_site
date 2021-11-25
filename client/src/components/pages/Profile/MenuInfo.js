import {Contacts} from '@material-ui/icons';
import React, {Component} from 'react';

class MenuInfo extends Component {
    render() {
        return(
            <span onClick={this.props.handleSwitchTab} className="profile-MenuItem item active-menu btn-dark btn btn-custom">
                <span style={{ textDecoration: "none", color: "#fff", marginRight: "12px" }}>
                    <Contacts className="mr-2"/>
                    Thông tin cơ bản
                </span>
            </span>
        )
    }
}

export default MenuInfo;