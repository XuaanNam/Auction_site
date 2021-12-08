import {VpnKey} from '@material-ui/icons';
import React, {Component} from 'react';

class MenuChangePass extends Component {
    render() {
        return(
            <span onClick={this.props.handleSwitchTab} className="btn btn-light">
                <VpnKey className="mr-2 pb-1"/>
                Đổi mật khẩu
            </span>
        )
    }
}

export default MenuChangePass;