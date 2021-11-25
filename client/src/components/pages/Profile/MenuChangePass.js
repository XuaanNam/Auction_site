import {VpnKey} from '@material-ui/icons';
import React, {Component} from 'react';

class MenuChangePass extends Component {
    render() {
        return(
            <span onClick={this.props.handleSwitchTab} className="profile-MenuItem item active-menu btn btn-custom bg-white">
                <span className="profile-btnchangepass "style={{ textDecoration: "none", color: "#333", marginRight: "12px" }}>
                    <VpnKey className="mr-2 mb-2"/>
                    Đổi mật khẩu
                </span>
            </span>
        )
    }
}

export default MenuChangePass;